import { hashPassword, comapirPassword } from "../helper/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone Number is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }

    if (!question) {
      return res.status(400).send({ message: "Question is required" });
    }
    const registerUser = await userModel.findOne({ email });
    if (registerUser) {
      return res
        .status(400)
        .send({ success: false, Message: "Already register please Login" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      question
    }).save();

    res.status(201).send({
      success: true,
      message: "user registration successfully",
      user,
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
      return res.status(404).send({ success: false, message: "No data found" });
    }
    const match = await comapirPassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "email is required" });
    }
    if (!question) {
      return res
        .status(400)
        .send({ success: false, message: "question is required" });
    }
    if (!newPassword) {
      return res
        .status(400)
        .send({ success: false, message: "newPassword is required" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Wrong email or password" });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res
      .status(200)
      .send({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected route");
};
