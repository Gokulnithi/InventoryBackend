const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  base: { type: String, required: true },
  type: {
    type: String,
    enum: ["purchase", "assignment", "transfer", "expended","returned"],
    required: true
  },
  count: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  fromBase: { type: String }, // only for transfers
  toBase: { type: String },   // only for transfers
  assignName: { type: String }, // only for assignments

  username: { type: String, required: true },
  role: { type: String, enum: ["admin", "commander", "user"], required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);
