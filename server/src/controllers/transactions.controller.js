import { sql } from "../config/db.js";

export const createTransaction = async (req, res) => {
  const { user_id, title, amount, category } = req.body;
  if (!user_id || !title || !amount || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = await sql`INSERT INTO transactions (
          user_id , title,amount ,category)
          values (
          ${user_id},${title},${amount},${category}
          )
          RETURNING *
  
          `;
    console.log("Transaction inserted:", result);
    res.status(201).json({
      transactions: result[0],
      message: "Transaction inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTransactions = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Transaction ID" });
  }
  try {
    const result = await sql`
        DELETE FROM transactions where id = ${id}
        RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const transactionSummary = async (req, res) => {
  const { userid } = req.params;
  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const balanceResult = await sql`
          SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userid}`;
    const income = await sql`
          SELECT COALESCE(SUM(amount),0)as income FROM transactions WHERE user_id = ${userid} AND amount > 0`;
    const expense = await sql`
          SELECT COALESCE(SUM(amount),0)as expense FROM transactions WHERE user_id = ${userid} AND amount < 0`;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: income[0].income,
      expense: expense[0].expense,
      message: "Summary fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTransactions = async (req, res) => {
  const { userid } = req.params;
  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const result = await sql`
          SELECT * FROM transactions WHERE user_id = ${userid} ORDER BY create_at DESC
          `;
    if (result.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }
    res.status(200).json({
      transactions: result,
      message: "Transactions fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
