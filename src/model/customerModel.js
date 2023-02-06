const mongoose = require("mongoose");

const customerModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobileNumber: String,
    DOB: String,
    emailId: String,
    address: String,
    customerID: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerModel);
