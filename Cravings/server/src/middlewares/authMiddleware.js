import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const biscuit = req.cookies.parleG;
    console.log("token recived in cookies:", biscuit); 

    const tea = jwt.verify(biscuit, process.env.JWT_SECRET);
    console.log(tea);

    const verifiedUser = await User.findById(tea.id); // verified from mongoose id

    if (!verifiedUser) {
      const error = new Error("Unauthorized , please Login Again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next(); // heading towards usercontroller to update

  } catch (error) {
    next(error);
  }
};

const AdminProteect = async(req,res,next )=>{
  try {
      if (req.user.role !== "admin") {
      const error = new Error("Unauthorized! Only admin can do this");
      error.statusCode = 401;
      return next(error);}
  } catch (error) {
    next(error)
  }
}

export const PartnerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "partner") {
      const error = new Error("Unauthorized! Only rider can do this");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const ManagerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "manager") {
      const error = new Error(
        "Unauthorized! Only restaurant manager can do this",
      );
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const CustomerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      const error = new Error("Unauthorized! Only user can do this");
      error.statusCode = 401;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};



export const ProtectOtp = async (req, res, next) => {
  try {
    const token = req.cookies.otpToken;
    console.log("token recived in cookies:", token); 

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    const verifiedUser = await User.findById(decode.id); // verified from mongoose id

    if (!verifiedUser) {
      const error = new Error("Unauthorized , please try Again");
      error.statusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next(); // heading towards usercontroller to update

  } catch (error) {
    next(error);
  }
};
