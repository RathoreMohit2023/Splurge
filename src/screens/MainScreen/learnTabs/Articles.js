import React, { useContext, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText } from "lucide-react-native";

import getArticlesStyle from "../../../styles/MainScreen/learnTabs/ArticleStyles"; 
import { ThemeContext } from "../../../components/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { GetArticleApi } from '../../../Redux/Api/GetArticleApi';
import { useDispatch, useSelector } from 'react-redux';     

const Articles = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getArticlesStyle(colors), [colors]);
  const navigation = useNavigation();
  const { LoginData } = useSelector(state => state.Login);
  const { GetArticleData } = useSelector(state => state.GetArticle);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetArticleApi(LoginData.token));
  }, [])

  const articles = GetArticleData?.Articles || [];

  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemCard} 
            activeOpacity={0.7}   
            onPress={() => {  
              if (item.url) {
                navigation.navigate("PDFViewer", { url: item.url });
              } else {
                Alert.alert("This article has no PDF yet.");
              }
            }}
          >
            <View style={styles.thumbnailBox}>
              <FileText size={24} color={colors.theme} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>

              {/* <View style={styles.row}>
                <View style={styles.metaRow}>
                    <Clock size={12} color={colors.textSecondary} />
                    <Text style={styles.subText}>{item.readTime}</Text>
                </View> 
                
                {item.completed && (
                    <View style={styles.badge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={styles.badgeText}>Read</Text>
                    </View>
                )}
              </View> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Articles;