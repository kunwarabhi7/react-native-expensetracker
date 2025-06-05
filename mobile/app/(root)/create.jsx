import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../../constants/api";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants/color";
import { styles } from "../../assets/styles/home.styles";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // Validation
    if (!title.trim()) {
      return Alert.alert("Error", "Please enter a transaction title");
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (!selectedCategory)
      return Alert.alert("Error", "Please select a category");
    setIsLoading(true);
    try {
      const formatedAmount = isExpense
        ? Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formatedAmount,
          category: selectedCategory,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }
      Alert.alert("Success", "Transaction Created successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create transaction");
      console.error("Error creating transaction", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(amount, "amounts");

  return (
    <View style={styles.containerCreate}>
      {/* Header */}
      <View style={styles.headerCreate}>
        <TouchableOpacity
          style={styles.backButtonCreate}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            style={styles.backButton}
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitleCreate}>New Transaction</Text>
        <TouchableOpacity
          style={[
            styles.saveButtonContainerCreate,
            isLoading && styles.saveButtonDisabledCreate,
          ]}
          onPress={handleCreate}
          disabled={!isLoading}
        >
          <Text style={styles.saveButtonCreate}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
          {!isLoading && (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.cardCreate}>
        <View style={styles.typeSelectorCreate}>
          {/* Expense Selector */}
          <TouchableOpacity
            style={[
              styles.typeButtonCreate,
              isExpense && styles.typeButtonActiveCreate,
            ]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIconCreate}
            />
            <Text
              style={[
                styles.typeButtonTextCreate,
                isExpense && styles.typeButtonTextActiveCreate,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          {/* Income Selector */}
          <TouchableOpacity
            style={[
              styles.typeButtonCreate,
              !isExpense && styles.typeButtonActiveCreate,
            ]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              style={styles.typeIconCreate}
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
            />
            <Text
              style={[
                styles.typeButtonTextCreate,
                !isExpense && styles.typeButtonTextActiveCreate,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>
        {/* Amount Container */}
        <View style={styles.amountContainerCreate}>
          <Text style={styles.currencySymbolCreate}>₹</Text>
          <TextInput
            style={styles.amountInputCreate}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        {/* Input Container */}
        <View style={styles.inputContainerCreate}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIconCreate}
          />
          <TextInput
            style={styles.inputCreate}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        {/* Title */}
        <Text style={styles.sectionTitleCreate}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />{" "}
          Category
        </Text>
        <View style={styles.categoryGridCreate}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButtonCreate,
                selectedCategory === category.name &&
                  styles.categoryButtonActiveCreate,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={
                  selectedCategory === category.name
                    ? COLORS.white
                    : COLORS.text
                }
                style={styles.categoryIconCreate}
              />

              <Text
                style={[
                  styles.categoryButtonTextCreate,
                  selectedCategory === category.name &&
                    styles.categoryButtonTextActiveCreate,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {isLoading && (
        <View style={styles.loadingContainerCreate}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default CreateScreen;
