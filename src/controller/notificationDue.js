const mongoose = require('mongoose')
const notificationDue = async (req, res) => {
  const { base } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const collection = mongoose.connection.collection(base);

    const results = await collection.find({}).toArray();

    const notifications = [];

    results.forEach((item) => {
      const overdueReceiptants = item.assigned?.receiptants?.filter((r) => {
        const returnDate = new Date(r.dateReturn);
        return returnDate <= today;
      });

      if (overdueReceiptants && overdueReceiptants.length > 0) {
        overdueReceiptants.forEach((r) => {
          notifications.push({
            itemId: item._id,
            itemName: item.name,
            assignedTo: r.name,
            count: r.count,
            dateAssigned: r.dateAssigned,
            dateReturn: r.dateReturn,
          });
        });
      }
    });

    res.json(notifications);
  } catch (err) {
    console.error(`Error fetching due notifications from ${base}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = notificationDue;
