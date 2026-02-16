import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import Menu from "../models/menuSchema.js";
import cloudinary from "../config/cloudinary.js";
import { UploadMultipleToCloudinary } from "../utils/imageUploader.js";
export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, message } = req.body;

    if (!fullName || !email || !mobileNumber || !message) {
      const error = new Error("All Fields Required");
      error.StatusCode = 400;
      return next(error);
    }

    //saving data in backend
    const newContact = await Contact.create({
      fullName,
      email,
      mobileNumber,
      message,
    });

    console.log(newContact);
    res.status(201).json({ message: "Thanks for contacting us." });
  } catch (error) {
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    );
    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuData = async (req, res, next) => {
   try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({
      restaurantID: id,
    })
      .sort({ updatedAt: -1 })
      .populate("restaurantID");

    res
      .status(200)
      .json({ message: "Menu fetched Sucessfully", data: restaurantMenuData });
  } catch (error) {
    next(error);
  }
};

export const uploadRestaurantImages = async (req, res, next) => {
  try {
   const images=  await UploadMultipleToCloudinary(req.files)  ;
   console.log(images);

   const resItem= req.user;
 res.status(201).json({
      message: "Images uploaded",
      data: resItem,
    });

     
  } catch (error) {
    next(error);
  }
};
