import { hashPassword, comapirPassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone Number is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is required" });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ success: true, Message: "Allready legister please Login" });
    }

    const hashedPassword = await hashPassword(password);
    const registerUser = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registration successfully",
      data: registerUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: true, message: "Check your email and password" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: true, message: "No data found" });
    }
    const match = await comapirPassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .send({ success: true, message: "Invalid password" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ success: true, message: "login successfully", token });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in login", error:error.message });
  }
};

export const testController = async(req, res)=>{
    res.send("protected route")
}
