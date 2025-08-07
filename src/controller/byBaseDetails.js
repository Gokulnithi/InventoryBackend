const mongoose = require('mongoose');
const byBaseDetails = async (req, res) => {
    const { base } = req.params;
  
    try {
      const collection = mongoose.connection.collection(base); // base = collection name
  
      const products = await collection.find().toArray();
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found in this base" });
      }
  
      res.json(products);
    } catch (err) {
      console.error("Error accessing collection:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = byBaseDetails;