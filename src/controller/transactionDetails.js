const Transaction = require("../models/transactionModel");
const transactionDetails = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }); // newest first
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

module.exports = transactionDetails;
