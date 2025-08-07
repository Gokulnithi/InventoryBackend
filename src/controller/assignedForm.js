const mongoose = require("mongoose");
const UserModel = require("../models/userModel"); 
const Transaction = require("../models/transactionModel");
const assignedForm = async (req, res) => {
  try {
    const { username, name, toname, count, date, dateR } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const userBase = user.base;
    if (!userBase) {
      return res.status(400).json("User base not defined");
    }

    const BaseModel =  mongoose.model(userBase); 
    const item = await BaseModel.findOne({ name });

    if (!item) {
      return res.status(404).json("Weapon not found in base");
    }

    if (!item.assigned.receiptants) {
      item.assigned.receiptants = [];
    }

    if (item.openingBalance.count < count) {
      return res.status(400).json({ message: "Insufficient stock to assign" });
    }
    const payload = {
      name: toname,
      count: parseInt(count),
      dateAssigned: new Date(date),
      dateReturn: new Date(dateR)
    };
    
    item.assigned.receiptants.push(payload);

    item.openingBalance.count -= count;

    await item.save();

    //trasaction save
    await Transaction.create({
      itemName: name,
      base: userBase,
      type: "assignment",
      count: count,
      date: date,
      assignName: toname,
      username:name,
      role:user.role,
    })
    res.status(201).json({ message: "Item assigned successfully", item });
  } catch (err) {
    console.error("Assignment error:", err);
    res.status(500).json({ message: "Not able to assign now", error: err.message });
  }
};

module.exports = assignedForm;
