const customrModel = require("../model/customerModel");

const customerRegister = async (req, res) => {
  const data = req.body;
  const {
    firstName,
    lastName,
    mobileNumber,
    DOB,
    emailID,
    customerID,
    status,
  } = data;
  const customer = await customrModel.create(data);
  res.status(201).send({ status: true, data: data });
};
const getCostumer = async (req, res) => {
  const id = req.params.id;
  const getDetail = await customrModel.find({ _id: id });
  res.status(200).send({ status: true, data: getDetail });
};

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  const delete1 = await customrModel.deleteOne({ _id: id });
  res.status(200).send({message: "data deleted"})
};

module.exports = { customerRegister, getCostumer, deleteCustomer };
