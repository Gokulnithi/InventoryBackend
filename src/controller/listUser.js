const User = require('../models/userModel');
const Base1 = require('../models/baseAsset1')
const Base2 = require('../models/baseAsset2')
const Base3 = require('../models/baseAsset3')

const listUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      let baseData = {};
  
      if (user.role === "admin") {
        const [data1, data2, data3] = await Promise.all([
          Base1.find({}),
          Base2.find({}),
          Base3.find({})
        ]);
        baseData = {
          base1: data1,
          base2: data2,
          base3: data3
        };
      } else {
        switch (user.base) {
          case "base1":
            baseData = { base1: await Base1.find({}) };
            break;
          case "base2":
            baseData = { base2: await Base2.find({}) };
            break;
          case "base3":
            baseData = { base3: await Base3.find({}) };
            break;
          default:
            return res.status(400).json({ message: "Invalid base assignment" });
        }
      }
  
      res.json({
        user,
        bases: baseData
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

module.exports = listUser;