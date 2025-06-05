import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useCallback, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, View } from "react-native";
import PageLoader from "../../components/PageLoader";
import { SignOutButton } from "../../components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { styles } from "../../assets/styles/home.styles";
import MainHeader from "../../components/MainHeader";
import BalanceCard from "../../components/BalanceCard";
import TransactionItem from "../../components/TransactionItem";

export default function Page() {
  const { user } = useUser();
  const [refreshing ,setRefreshing] = useState(false)

  const {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransactions,
  } = useTransaction(user?.id);
  console.log(transactions.transactions,'transaction')

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [loadData, user?.id]);

  const handleDelete = useCallback((id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTransactions(id) },
      ]
    );
  }, [deleteTransactions]);

const onRefresh = async() =>{
  setRefreshing(true);
  await loadData()
  setRefreshing(false)
}



  if (loading && !refreshing) return <PageLoader />;



  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MainHeader />
      </View>

      <BalanceCard summary={summary} />

      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={[styles.transactionsListContent, { paddingBottom: 20 }]}
        data={transactions.transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found.</Text>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
