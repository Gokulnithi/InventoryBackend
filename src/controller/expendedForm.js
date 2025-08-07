const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");
const expendedForm = async (req, res) => {
  try {
    const { base, id } = req.params;
    const { returnedCount, expendedCount, receiptantId, username, role } =
      req.body;

    if (
      !base ||
      !id ||
      returnedCount == null ||
      expendedCount == null ||
      !receiptantId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const BaseModel = mongoose.model(base);
    const item = await BaseModel.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in base" });
    }

    if (!item.openingBalance) {
      item.openingBalance = { count: 0 };
    }
    item.openingBalance.count += returnedCount;

    if (!item.expended) {
      item.expended = { count: 0 };
    }
    item.expended.count += expendedCount;
    item.expended.date = new Date();

    if (item.assigned?.receiptants) {
      item.assigned.receiptants = item.assigned.receiptants.filter(
        (r) => r._id.toString() !== receiptantId
      );
    }

    await item.save();
    if (expendedCount > 0) {
      await Transaction.create({
        itemName: item.name,
        base: base,
        type: "expended",
        count: expendedCount,
        date: item.expended.date,
        username: username,
        role: role,
      });
    }
    if (returnedCount > 0) {
      await Transaction.create({
        itemName: item.name,
        base: base,
        type: "returned",
        count: returnedCount,
        date: item.expended.date,
        username: username,
        role: role,
      });
    }
    res
      .status(200)
      .json({
        message: "Return and expended updated, assignment removed",
        item,
      });
  } catch (err) {
    console.error("Expended update error:", err);
    res.status(500).json({ message: "Failed to update item" });
  }
};

module.exports = expendedForm;
