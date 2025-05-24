import express from "express";
import {
  createTransaction,
  deleteTransactions,
  getTransactions,
  transactionSummary,
} from "../controllers/transactions.controller.js";

const router = express.Router();

router.get("/:userid", getTransactions);

router.post("/", createTransaction);

router.delete("/:id", deleteTransactions);

router.get("/summary/:userid", transactionSummary);

export default router;
