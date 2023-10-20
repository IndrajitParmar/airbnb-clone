import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashpassword = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    email,
    password: hashpassword,
  });
  try {
    await user.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));
    const validpassword = bcrypt.compareSync(password, user.password);
    if (!validpassword) return next(errorHandler(401, "Invalid password"));
    const { password: pass, ...rest } = user._doc;
    const tokken = jwt.sign({ id: user._id }, process.env.jwt);
    res
      .cookie("access_token", tokken, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
