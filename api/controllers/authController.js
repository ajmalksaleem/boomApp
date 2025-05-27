import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import { validateUsername } from "../utils/validator.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return next(errorHandler(400, "All fileds are required"));
    validateUsername(username, next);
    const findUserByUsername = await User.findOne({ username });
    if (findUserByUsername) {
      return next(errorHandler(400, "Username Already Exists"));
    }
    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail) {
      return next(errorHandler(400, "Email-Id Already exists "));
    }
    if (password.length < 5)
      return next(
        errorHandler(401, "password should be greater than 5 charectors")
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user created succesfully" });
  } catch (error) {
    next(error);
  }
};

export const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All field required"));
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return next(errorHandler(400, "User not found"));
    const validdatePassword = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!validdatePassword)
      return next(errorHandler(401, "Password or Email is incorrect"));
    const token = jwt.sign(
      { _id: foundUser._id, email: foundUser.email, username : foundUser.username, walletBalance:foundUser.walletBalance },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).cookie("boomtoken", token, { httpOnly: true });
    const { password: pass, ...rest } = foundUser._doc;
    res.json({
      success: true,
      message: "Logged in successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};


export const Checkuser = async(req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success : true,
    message : "Authenticated User!",
    user
  })
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("tokensh").json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
   next(error) 
  }
};