const customrModel = require("../model/customerModel")


const customerRegister= async (req, res)=>{
    let data = req.body
    const {firstName,lastName, mobileNumber, DOB,emailID,customerID, status } = data
    const customer = await customrModel.create(data)
    res.status(201).send({status:true, data: data})
}


module.exports = {customerRegister}