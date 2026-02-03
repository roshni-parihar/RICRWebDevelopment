import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"; 

import Menu from "../models/menuSchema.js";
import { UploadMultipleToCloudinary } from "../utils/imageUploader.js";

export const ManagerUpdate = async (req, res, next) => {
  // exported to user router
  try {
    const {
      fullName,
      email,
      mobileNumber,
      gender,
      dob,
      address,
      city,
      pin,
      documents,
      paymentDetails,
      geolocation,
      restaurantName,
      cuisine,
      menu,
    } = req.body;

    const currentManager = req.user;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !gender ||
      dob ||
      !address ||
      !city ||
      !pin ||
      !documents ||
      !paymentDetails ||
      !geolocation ||
      !restaurantName ||
      !cuisine ||
      !menu
    ) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentManager); // old user data in json format

    currentManager.fullName = fullName; // inserting update data on currentManager
    currentManager.email = email;
    currentManager.mobileNumber = mobileNumber;
    currentManager.gender = gender;
    currentManager.dob = dob;
    currentManager.address = address;
    currentManager.city = city;
    currentManager.pin = pin;
    currentManager.documents = documents;
    currentManager.paymentDetails = paymentDetails;
    currentManager.geolocation = geolocation;
     currentManager.restaurantName = restaurantName;
      currentManager.cuisine= cuisine;
       currentManager.menu= menu;
    await currentManager.save();

    console.log(currentManager); // new data

    res.status(200).json({ message: "Manager Updated Successfully" });

    /*
    // second way
    const updateManager = await User.findByIdAndUpdate(
      { _id: currentManager._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated Manager", updateManager);
    res.status(200).json({ message: "Manager Updated Successfully",data:updateManager });
*/
    console.log("updating Manager");
  } catch (error) {
    next(error);
  }
};
export const ManagerChangePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);

    const currentManager = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile Picture Required");
      error.statusCode = 400;
      return next(error);
    }
    console.log("DP:", dp);

    if (currentManager.photo.publicID) {
      await cloudinary.uploader.destroy(currentManager.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");

    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("DataURI:", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uploaded Successfully", result);
    currentManager.photo.url = result.secure_url;
    currentManager.photo.publicID = result.public_id;

    await currentManager.save();

    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};
export const ManagerResetPassword = async (req, res, next) => {
  try {
    const [oldPassword, newPassword] = req.body;
    const currentManager = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      oldPassword,
      currentManager.password,
    );

    if (!isVerified) {
      const error = new Error("Old Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentManager.password = hashPassword;
    await currentManager.save();
    res.status(200).json({ message: "Password Reset Succefully" });
  } catch (error) {
    next(error);
  }
};

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const {
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
    } = req.body;

    const CurrentUser = req.user;

    if (
      !itemName ||
      !description ||
      !price ||
      !type ||
      !preparationTime ||
      !availability ||
      !servingSize ||
      !cuisine
    ) {
      const error = new Error("All Fields are Required");
      error.statusCode = 400;
      return next(error);
    }

    const images = await UploadMultipleToCloudinary(req.files);
    console.log(images);

    const newMenuItem = await Menu.create({
      itemName,
      description,
      price,
      type,
      preparationTime,
      availability,
      servingSize,
      cuisine,
      images,
      resturantID: CurrentUser._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuItem = async (req, res, next) => {
  try {
    const CurrentUser = req.user;

    const menuItems = await Menu.find({ resturantID: CurrentUser._id });

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};
