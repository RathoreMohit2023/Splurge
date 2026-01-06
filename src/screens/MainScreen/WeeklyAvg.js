// WeeklyAvg.js

import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
// MODIFIED: Importar SafeAreaView do react-native-safe-area-context
import { SafeAreaView } from 'react-native-safe-area-context';

// Você pode reutilizar o componente de linha de transação do seu painel ou criar um novo
const TransactionRow = ({ item }) => (
  <View style={styles.transactionRow}>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionTitle}>{item.description}</Text>
      <Text style={styles.transactionSub}>{item.category} • {new Date(item.date).toLocaleDateString()}</Text>
    </View>
    <Text style={styles.transactionAmount}>-₹{Number(item.amount).toLocaleString()}</Text>
  </View>
);

const WeeklyAvg = ({ route }) => {
  // Obter os dados de transação passados pela navegação
  const { transactions } = route.params;

  return (
    // Usando SafeAreaView do react-native-safe-area-context
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.header}>Weekly Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TransactionRow item={item} />}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No transactions recorded this week.</Text>
            </View>
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343a40',
        paddingHorizontal: 16,
        paddingTop: 16, // Adicionado para espaçamento superior
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 8,
        // Adicionando uma sombra sutil
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    transactionDetails: {
        flex: 1, // Permite que o texto seja quebrado se for muito longo
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212529'
    },
    transactionSub: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#dc3545', // Cor para despesas
        marginLeft: 10, // Adiciona espaço entre os detalhes e o valor
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#6c757d',
    },
});

export default WeeklyAvg;