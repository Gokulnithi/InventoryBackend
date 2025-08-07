const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const transferinForm = async (req, res) => {
  try {
    const { username, itemName, fromBase, toBase, count, receivedDate } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json("User not found");

    const FromBaseModel = mongoose.model(fromBase);
    const ToBaseModel = mongoose.model(toBase);

    const fromBaseModal = await FromBaseModel.findOne({ name: itemName });
    if (!fromBaseModal || !fromBaseModal.openingBalance) {
      return res.status(404).json("Item not found in source base");
    }

    if (fromBaseModal.openingBalance.count < count) {
      return res.status(400).json("Insufficient stock in source base");
    }

    fromBaseModal.openingBalance.count -= count;
    fromBaseModal.transferedOut.count +=count
    fromBaseModal.transferedOut.date = receivedDate;
    await fromBaseModal.save();

    let toBaseModal = await ToBaseModel.findOne({ name: itemName });
    if (!toBaseModal) {
      toBaseModal = new ToBaseModel({
        name: itemName,
        transferedIn: { count: count, date: receivedDate }
      });
    } else {
      if (!toBaseModal.transferedIn) {
        toBaseModal.transferedIn = { count: 0 };
      }
      toBaseModal.transferedIn.count += count;
      toBaseModal.transferedIn.date = receivedDate;
    }

    await toBaseModal.save();
    await Transaction.create({
      itemName: itemName,
      base: fromBase,
      type: "transfer",
      count: count,
      date: receivedDate,
      toBase: toBase,
      username:username,
      role:user.role,
    });

    res.status(201).json("Item transferred successfully");
  } catch (err) {
    console.error("Transfer In error:", err.message);
    res.status(500).json("Transfer failed");
  }
};

module.exports = transferinForm;
