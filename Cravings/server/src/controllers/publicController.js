import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import Menu from "../models/menuSchema.js";
import cloudinary from "../config/cloudinary.js";
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
    const { restaurantID } = req.params;

    const restaurant = await User.findOne({
      _id: restaurantID,
      role: "manager",
    }).select("-password");

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const menu = await Menu.find({
      restaurantID: restaurantID,
    });

    res.status(200).json({
      data: {
        restaurant,
        menu,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadRestaurantImages = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const images = req.files;

    if (!images || images.length === 0) {
      const error = new Error("Images Required");
      error.statusCode = 400;
      return next(error);
    }

    if (images.lenght > 5) {
      images= images.slice(0, 5);
    }
    uploadedImages = [];

    for (const image of images) {
      const b64 = Buffer.from(image.buffer).toString("base64");

      const dataURI = `data:${image.mimetype};base64,${b64}`;
      console.log("DataURI:", dataURI.slice(0, 100));

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Cravings/User",
        width: 500,
        height: 500,
        crop: "fill",
      });
      uploadedImages.push({
        url: result.secure_url,
        publicID: result.public_id,
      });}
      
      currentUser.restaurantImages = uploadedImages;
      await currentUser.save();
      res.status(200).json({ message: "images uploaded", data:uploadedImages});
    
  } catch (error) {
    next(error);
  }
};
