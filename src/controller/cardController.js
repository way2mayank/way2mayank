const cardModel = require("../model/cardModel");

const createCard = async (req, res) => {
  const data = req.body;
  const { cardNumber, cardType, customerName, status, vision, customerID } =
    data;
  const card = await cardModel.create(data);
  res.status(201).send({ status: true, data: card });
};

const getDetail = async (req, res)=>{
    const id = req.params.id
    const details = await cardModel.find({_id: id})
    res.status(200).send(details)
}

module.exports ={ createCard, getDetail}