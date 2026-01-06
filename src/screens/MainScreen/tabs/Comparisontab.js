import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  Sparkles,
  ShoppingBag,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  Layers,
} from 'lucide-react-native';

import { ThemeContext } from '../../../components/ThemeContext';
import getComparisonStyles from '../../../styles/MainScreen/tabs/ComparisonStyle';
import GeminiService from '../../../services/GeminiService';
import { useSelector } from 'react-redux';

const ComparisonTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getComparisonStyles(colors), [colors]);

  const { LoginData } = useSelector(state => state.Login);
  const { GetWishlistData, GetWishlistLoading } = useSelector(
    state => state.GetWishlist || {},
  );
  const { GetTransactionData, GetTransactionLoading } = useSelector(
    state => state.GetTransaction || {},
  );

  const [aiData, setAiData] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(true);

  // --- DATA PROCESSING ---
  const currentMonthTransactions = useMemo(() => {
    if (!GetTransactionData?.get_transactions) return [];
    const now = new Date();
    return GetTransactionData.get_transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === now.getFullYear() &&
        transactionDate.getMonth() === now.getMonth()
      );
    });
  }, [GetTransactionData]);

  const totalSpent = useMemo(() => {
    return currentMonthTransactions.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0,
    );
  }, [currentMonthTransactions]);

  const formattedWishlist = useMemo(() => {
    if (!GetWishlistData?.get_wishlists) return [];
    return GetWishlistData.get_wishlists.map(item => ({
      name: item.name,
      price: parseFloat(item.price),
    }));
  }, [GetWishlistData]);

  const parseInterest = raw => {
    try {
      if (!raw) return [];
      let cleaned =
        raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
      cleaned = cleaned.replace(/\\/g, '');
      const arr = JSON.parse(cleaned);
      if (
        arr.length === 1 &&
        typeof arr[0] === 'string' &&
        arr[0].includes(',')
      ) {
        return arr[0].split(',').map(i => i.trim());
      }
      return arr;
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    const fetchAiData = async () => {
      if (GetWishlistLoading || GetTransactionLoading) return;
      const interests = parseInterest(LoginData?.user?.interest);
      if (
        interests.length > 0 &&
        totalSpent > 0 &&
        formattedWishlist.length > 0
      ) {
        setIsAiLoading(true);
        const result = await GeminiService({ totalSpent, wishlist: formattedWishlist, interests });
        setAiData(result);
        setIsAiLoading(false);
      } else {
        setIsAiLoading(false);
      }
    };
    fetchAiData();
  }, [
    LoginData,
    currentMonthTransactions,
    GetWishlistData,
    GetWishlistLoading,
    GetTransactionLoading,
  ]);

  // --- LOGIC: Smart Transaction Matching ---
  const getTransactionBundle = (targetPrice) => {
    // 1. PRIORITY: Check for a SINGLE transaction that is "Nearby" or covers the cost.
    // We look for any transaction amount >= targetPrice.
    // We sort ASCENDING to find the one closest to the target price (the smallest one that still affords it).
    
    const possibleSingleMatches = currentMonthTransactions
      .filter(t => parseFloat(t.amount) >= targetPrice)
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

    if (possibleSingleMatches.length > 0) {
      // Found a single transaction that covers it!
      const bestMatch = possibleSingleMatches[0]; // The one closest to the price
      return {
        isAffordable: true,
        transactions: [bestMatch],
        totalAccumulated: parseFloat(bestMatch.amount)
      };
    }

    // 2. FALLBACK: Accumulate multiple transactions
    // If no single transaction is big enough, sort DESCENDING to combine the biggest expenses first.
    const sortedDescending = [...currentMonthTransactions].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    
    let accumulated = 0;
    let bundle = [];
    
    for (let t of sortedDescending) {
      if (accumulated >= targetPrice) break;
      accumulated += parseFloat(t.amount);
      bundle.push(t);
    }
    
    return {
      isAffordable: accumulated >= targetPrice,
      transactions: bundle,
      totalAccumulated: accumulated
    };
  };

  // --- UI RENDER FUNCTIONS ---

  const renderListHeader = () => (
    <View style={styles.listHeaderContainer}>
      <View style={styles.aiCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.iconCircleAI}>
            <Sparkles size={18} color="#fff" />
          </View>
          <Text style={styles.cardTitleAI}>AI Financial Insight</Text>
        </View>

        <View style={styles.aiContent}>
          {isAiLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.aiText}>Analyzing spending patterns...</Text>
            </View>
          ) : !aiData || !aiData.summary ? (
            <Text style={styles.aiText}>
              Spend a bit more this month to unlock AI insights.
            </Text>
          ) : (
            <>
              <Text style={styles.aiSummaryText}>{aiData.summary}</Text>

              {aiData.affordableWishlist?.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>Within Reach:</Text>
                  {aiData.affordableWishlist.map((item, index) => (
                    <View key={index} style={styles.bulletRow}>
                      <CheckCircle2 size={14} color={colors.success} style={{ marginTop: 2 }} />
                      <Text style={styles.aiText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}

              {aiData.suggestions?.length > 0 && (
                <View style={styles.aiSection}>
                  <Text style={styles.aiSectionTitle}>Smart Recommendations:</Text>
                  {aiData.suggestions.map((s, i) => (
                    <View key={i} style={styles.suggestionBadge}>
                      <BrainCircuit size={14} color={colors.primary} />
                      <Text style={styles.suggestionText}>
                        {s.name} <Text style={styles.suggestionPrice}>({s.estimatedPrice})</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </View>

      {renderMajorTransactionCard()}

      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionTitle}>Opportunity Cost</Text>
        <Text style={styles.sectionSubtitle}>This Month</Text>
      </View>
    </View>
  );

  const renderMajorTransactionCard = () => {
    if (currentMonthTransactions.length < 2 || !GetWishlistData?.get_wishlists) return null;

    // Logic: Combined Top 3 Transactions
    const topTransactions = [...currentMonthTransactions]
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
      .slice(0, 3); 

    if (topTransactions.length === 0) return null;

    const combinedAmount = topTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    let affordableItems = GetWishlistData.get_wishlists.filter(
      item => parseFloat(item.price) < combinedAmount,
    );

    if (affordableItems.length <= 1) return null;

    const descriptionList = topTransactions.map(t => t.description);
    const descriptionText = descriptionList.length > 2 
      ? `${descriptionList[0]}, ${descriptionList[1]} & others`
      : descriptionList.join(' & ');

    return (
      <View style={styles.majorCard}>
        <View style={styles.cardHeaderRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.error + '20' }]}>
            <AlertCircle size={18} color={colors.error} />
          </View>
          <Text style={styles.cardTitle}>Major Expense Impact</Text>
        </View>
        <Text style={styles.majorText}>
          Your combined expenses of{' '}
          <Text style={styles.amountHighlight}>₹{combinedAmount.toLocaleString()}</Text>{' '}
          on <Text style={{ fontStyle: 'italic', fontWeight:'bold' }}>"{descriptionText}"</Text>{' '}
          could have funded multiple items from your wishlist.
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {GetWishlistLoading || GetTransactionLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <>
          <ShoppingBag size={48} color={colors.textSecondary} style={{ opacity: 0.5 }} />
          <Text style={styles.emptyText}>Add items to your wishlist to see comparisons.</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={GetWishlistData?.get_wishlists || []}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item }) => {
          const itemPrice = parseFloat(item.price);
          
          // Get Bundle (Single "Nearby" or Multiple)
          const { isAffordable, transactions, totalAccumulated } = getTransactionBundle(itemPrice);
          const statusColor = isAffordable ? colors.success : colors.error;

          return (
            <View style={styles.itemCard}>
              {/* Card Top: Item Info */}
              <View style={styles.itemMainRow}>
                <View style={styles.itemIconBox}>
                  <ShoppingBag size={22} color={colors.white} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{itemPrice.toLocaleString()}</Text>
                </View>

                <View style={[styles.statusPill, {
                      backgroundColor: isAffordable ? colors.success + '15' : colors.error + '15',
                      borderColor: isAffordable ? colors.success + '40' : colors.error + '40',
                    }]}>
                  {isAffordable ? (
                    <CheckCircle2 size={12} color={colors.success} />
                  ) : (
                    <XCircle size={12} color={colors.error} />
                  )}
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {isAffordable ? 'Affordable' : 'Too Costly'}
                  </Text>
                </View>
              </View>

              {/* Card Bottom: The Trade-off */}
              {isAffordable && transactions.length > 0 && (
                <View style={styles.tradeOffContainer}>
                  <View style={styles.tradeOffHeader}>
                    {transactions.length > 1 ? (
                        <Layers size={14} color={colors.textSecondary} />
                    ) : (
                        <TrendingDown size={14} color={colors.textSecondary} />
                    )}
                    <Text style={styles.tradeOffLabel}>
                      Instead of spending on:
                    </Text>
                  </View>
                  
                  <View style={{ marginTop: 5 }}>
                    {transactions.map((t, idx) => (
                         <View key={idx} style={[styles.tradeOffValueBox, { marginBottom: 4 }]}>
                            <Text style={styles.tradeOffItemName} numberOfLines={1}>{t.description}</Text>
                            <View style={styles.tradeOffArrow}>
                                <ArrowRight size={14} color={colors.textSecondary} />
                            </View>
                            <Text style={styles.tradeOffPrice}>₹{parseFloat(t.amount).toLocaleString()}</Text>
                         </View>
                    ))}
                    
                    {/* Show Total Saved only if multiple transactions were combined */}
                    {transactions.length > 1 && (
                        <View style={{ borderTopWidth: 1, borderColor: colors.border, marginTop: 4, paddingTop: 4, flexDirection:'row', justifyContent:'flex-end' }}>
                            <Text style={{ fontSize: 12, color: colors.textSecondary, marginRight: 5 }}>Total:</Text>
                            <Text style={{ fontSize: 12, color: colors.success, fontWeight:'bold' }}>₹{totalAccumulated.toLocaleString()}</Text>
                        </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ComparisonTab;