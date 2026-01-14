import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, password } = req.body;

    if (!fullName || !email || !mobileNumber || !password) {
      const error = new Error("All Fields Required");
      error.StatusCode = 400;
      return next(error);
    }
    // checking user is already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email is already registered");
      error.StatusCode = 409;
      return next(error);
      
    }

    // encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log("hashpassword",hashPassword);
    

    //saving data in backend
    const newUser = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashPassword,
    });

    // sending respose to FrontEnd
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};
export const UserLogin = async (req, res, next) => {
  try {
    // fetching from frontend
    const { email, password } = req.body;

    //verifying
    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.StatusCode = 400;
      return next(error);
    }
    // checking user is registered or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    // verify the Password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.StatusCode = 402;
      return next(error);
    }

    //sending message to frontend
    res.status(200).json({ message: "Login Successfull",data:existingUser });

    //end
  } catch (error) {
    next(error);
  }
};
export const UserLogout = async (req, res, next) => {
  try {
res.status(200).json({ message: "Logout Successfull"});

  } catch (error) {
    next(error);
  }
};
