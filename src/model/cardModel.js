const mongoose = require("mongoose");

const cardModel = new mongoose.Schema(
  {
    cardNumber: String,
    cardType: String,
    customerName: String,
    status: String,
    vision: String,
    customerID: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("card", cardModel);
