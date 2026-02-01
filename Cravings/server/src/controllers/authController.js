import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genToken,genOtpToken } from "../utils/authToken.js";
import { sendOTPEmail } from "../utils/emailService.js";
import OTP from "../models/otpModel.js"

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, password, role } = req.body;

    if (!fullName || !email || !mobileNumber || !password || !role) {
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
    console.log("hashpassword", hashPassword);

    const photoURL = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;
    const photo = {
      url: photoURL,
    };
    //saving data in backend
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      mobileNumber,
      password: hashPassword,
      role,
      photo,
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

    // Token Generation
    await genToken(existingUser, res);

    //sending message to frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });

    //end
  } catch (error) {
    next(error);
  }
};
export const UserLogout = async (req, res, next) => {
  try {
    res.clearCookie("parleG");
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};
export const UserGenOTP =async(req, res, next)=>{
  try {
     // fetching from frontend
    const { email } = req.body;

    //verifying
    if (!email) {
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

     //Check if user is otp is there or not
    const existingUserOTP = await OTP.findOne({ email });
    if (existingUserOTP) {
      await existingUserOTP.deleteOne();
    }

    const otp =  Math.floor(Math.random()*1000000).toString();

    //encrypting otp
    const salt= await bcrypt.genSalt(10);
    const hashOTP=await bcrypt.hash(otp,salt);

    await OTP.create({
      email,
      otp:hashOTP,
     
    });
    await sendOTPEmail(email, otp);

    res.status(200).json({message:"OTP send on registered email"})
  } catch (error) {
    next(error);
  }
}

export const UserVerifyOtp = async (req, res, next) => {
  try {
    //Fetch Data from Frontend
    const { email, otp } = req.body;

    //verify that all data exist
    if (!email || !otp) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    //Check if user is registred or not
    const existingUserOTP = await OTP.findOne({ email });
    if (!existingUserOTP) {
      const error = new Error("OTP Match Error, Please Retry");
      error.statusCode = 401;
      return next(error);
    }

    //verify the Password
    const isVerified = await bcrypt.compare(otp, existingUserOTP.otp);
    if (!isVerified) {
      const error = new Error("OTP Match Error, Please Retry");
      error.statusCode = 401;
      return next(error);
    }

    await existingUserOTP.deleteOne();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    //Token Generation will be done here
    genOtpToken(existingUser, res);

    //send message to Frontend
    res.status(200).json({ message: "OTP Verified. Create New Password Now" });
    //End
  } catch (error) {
    next(error);
  }
};

export const UserForgetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const currentUser = req.user;

    if (!newPassword) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentUser.password = hashPassword;

    await currentUser.save();

    res
      .status(200)
      .clearCookie("otpToken")
      .json({ message: "Password Changed. Please login again" });
  } catch (error) {
    next(error);
  }
};
