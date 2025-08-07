const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "commander", "user"],
    },
    base: {
      type: String,
      required: true,
      enum: ["base1", "base2", "base3"],
    },
  },
  {
    timestamps:true,
  }
);

module.exports = mongoose.model("User",userSchema);
