// models.js

const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: String,
  count: Number,
  dateAssigned: Date,
  dateReturn: Date
}, { _id: false });

const assetSchema = new mongoose.Schema({
  name: {
    type:String,
    unique:true,
    required:true
  },
  category: String,
  image: String,
  base_id: String,
  openingBalance: {
    count: Number,
    date: Date
  },
  purchased: {
    count: Number,
    date: Date
  },
  transferedIn: {
    count: Number,
    date: Date
  },
  transferedOut: {
    count: Number,
    date: Date
  },
  assigned: {
    receiptants: [recipientSchema]
  },
  expended: {
    count: Number,
    date: Date
  }
});

module.exports = mongoose.model("base2", assetSchema);
