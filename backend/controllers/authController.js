import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("Itz Hittingh ...!");

  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: false, // secure against XSS
      secure: process.env.NODE_ENV === "production", // only https in prod
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
