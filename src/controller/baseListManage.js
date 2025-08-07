const mongoose = require("mongoose");
const baseSend = async (req, res)=>{
    const { base, id } = req.params;

  try {
    const collection = mongoose.connection.collection(base); 

    const product = await collection.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in this base" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error accessing collection:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = baseSend