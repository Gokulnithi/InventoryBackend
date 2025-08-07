const mongoose = require("mongoose");
const UserModel = require("../models/userModel"); 
const Transaction = require("../models/transactionModel");
const purchaseForm = async (req, res) => {
  try {
    const { username, name, count, date } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const userBase = user.base;
    if (!userBase) {
      return res.status(400).json("User base not defined");
    }

    const BaseModel = mongoose.model(userBase); 
    const weapon = await BaseModel.findOne({ name });
    console.log(weapon);
    if (!weapon) {
      return res.status(404).json("Weapon not found in base");
    }

    if (!weapon.purchased) {
      weapon.purchased = { count: 0 };
    }

    weapon.purchased.count += count;
    weapon.purchased.date = date;
    await weapon.save();

    await Transaction.create({
      itemName: name,
      base: userBase,
      type: "purchase",
      count: count,
      date: date,
      username:username,
      role:user.role,
    });

    res.status(201).json("Purchased");
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json("Not able to Purchase now");
  }
};

module.exports = purchaseForm;
