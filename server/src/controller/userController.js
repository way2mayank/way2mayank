import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "Please use another email" });

    const haspassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      age,
      email,
      password: haspassword,
    });

    if (newUser) {
      console.log(newUser);
      return res
        .status(201)
        .send({ success: true, message: "User ragistration successful" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "User ragistration failed" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User not Found" });

    const compairPassword = await bcrypt.compare(password, user.password);
    if (!compairPassword) {
      return res
        .status(400)
        .send({ success: false, message: "Check Email and password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "thisissecretkey"
    );

    return res.status(200).send({
      success: true,
      message: "User login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        isAdmin:user.isAdmin
      },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({ isAdmin: false }).select("-password");
    res.status(200).send({ success: true, users });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
