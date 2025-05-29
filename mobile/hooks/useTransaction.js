import { useCallback, useState } from "react";
import { Alert } from "react-native";
const API_URL = "http://localhost:3000/api/transactions/";
// "https://react-native-expensetracker.onrender.com/api/transactions/";
export const useTransaction = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}summary/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransactions = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${id}`);
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      loadData();
      Alert.alert("Transaction deleted successfully");
    } catch (error) {
      Alert.alert("Error deleting transaction:", error);
    }
  };
  return {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransactions,
    fetchTransactions,
    fetchSummary,
  };
};
