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
      openTime,
      closeTime,
    } = req.body;

    const currentManager = req.user;

    // Validation for required fields
    if (!fullName || !email || !mobileNumber) {
      const error = new Error(
        "Full Name, Email, and Mobile Number are required",
      );
      error.statusCode = 400;
      return next(error);
    }

    if (!city || !pin) {
      const error = new Error("City and PIN Code are required");
      error.statusCode = 400;
      return next(error);
    }
    if (!openTime || !closeTime) {
      const error = new Error("open and close timing are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!restaurantName) {
      const error = new Error("Restaurant Name is required");
      error.statusCode = 400;
      return next(error);
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobileNumber.replace(/\D/g, ""))) {
      const error = new Error("Mobile number must be 10 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(pin)) {
      const error = new Error("PIN code must be 6 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PAN format if provided
    if (
      documents?.pan &&
      documents.pan !== "N/A" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documents.pan)
    ) {
      const error = new Error("Invalid PAN format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate UPI format if provided
    if (
      paymentDetails?.upi &&
      paymentDetails.upi !== "N/A" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(paymentDetails.upi)
    ) {
      const error = new Error("Invalid UPI format");
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
    currentManager.cuisine = cuisine;
    currentManager.menu = menu;
    currentManager.openTime = openTime;
    currentManager.closeTime = closeTime;
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
      restaurantID: CurrentUser._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const RestaurantEditMenuItem = async (req, res, next) => {
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

    const { id } = req.params;

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

    let images = [];
    if (req.files) {
      images = await UploadMultipleToCloudinary(req.files);
      console.log(images);
    }

    const existingMenuItem = await Menu.findById(id);

    existingMenuItem.itemName = itemName || existingMenuItem.itemName;
    existingMenuItem.description = description || existingMenuItem.description;
    existingMenuItem.price = price || existingMenuItem.price;
    existingMenuItem.type = type || existingMenuItem.type;
    existingMenuItem.preparationTime =
      preparationTime || existingMenuItem.preparationTime;
    existingMenuItem.availability =
      availability || existingMenuItem.availability;
    existingMenuItem.servingSize = servingSize || existingMenuItem.servingSize;
    existingMenuItem.cuisine = cuisine || existingMenuItem.cuisine;
    existingMenuItem.images =
      images.length > 0 ? images : existingMenuItem.images;
    await existingMenuItem.save();

    res.status(201).json({
      message: "Menu Item Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantMenuItem = async (req, res, next) => {
  try {
    const CurrentUser = req.user;

    //const menuItems = await Menu.find({ restaurantID: CurrentUser._id });
    const menuItems = await Menu.find({});

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

export const RestaurantUpdate = async (req, res, next) => {
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
      restaurantName,
      cuisine,
      documents,
      paymentDetails,
      geoLocation,
    } = req.body;
    const currentUser = req.user;

    // Validation for required fields
    if (!fullName || !email || !mobileNumber) {
      const error = new Error(
        "Full Name, Email, and Mobile Number are required",
      );
      error.statusCode = 400;
      return next(error);
    }

    if (!city || !pin) {
      const error = new Error("City and PIN Code are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!restaurantName) {
      const error = new Error("Restaurant Name is required");
      error.statusCode = 400;
      return next(error);
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobileNumber.replace(/\D/g, ""))) {
      const error = new Error("Mobile number must be 10 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(pin)) {
      const error = new Error("PIN code must be 6 digits");
      error.statusCode = 400;
      return next(error);
    }

    // Validate PAN format if provided
    if (
      documents?.pan &&
      documents.pan !== "N/A" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documents.pan)
    ) {
      const error = new Error("Invalid PAN format");
      error.statusCode = 400;
      return next(error);
    }

    // Validate UPI format if provided
    if (
      paymentDetails?.upi &&
      paymentDetails.upi !== "N/A" &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(paymentDetails.upi)
    ) {
      const error = new Error("Invalid UPI format");
      error.statusCode = 400;
      return next(error);
    }

    // Update personal information
    currentUser.fullName = fullName;
    currentUser.email = email.toLowerCase();
    currentUser.mobileNumber = mobileNumber;
    currentUser.gender = gender || currentUser.gender;
    currentUser.dob = dob || currentUser.dob;
    currentUser.address = address || currentUser.address;
    currentUser.city = city;
    currentUser.pin = pin;

    // Update restaurant information
    currentUser.restaurantName = restaurantName;
    currentUser.cuisine = cuisine || currentUser.cuisine;

    // Update nested documents
    if (documents) {
      currentUser.documents = {
        gst: documents.gst || currentUser.documents?.gst || "N/A",
        fssai: documents.fssai || currentUser.documents?.fssai || "N/A",
        rc: documents.rc || currentUser.documents?.rc || "N/A",
        dl: documents.dl || currentUser.documents?.dl || "N/A",
        uidai: documents.uidai || currentUser.documents?.uidai || "N/A",
        pan: documents.pan || currentUser.documents?.pan || "N/A",
      };
    }

    // Update payment details
    if (paymentDetails) {
      currentUser.paymentDetails = {
        upi: paymentDetails.upi || currentUser.paymentDetails?.upi || "N/A",
        account_number:
          paymentDetails.account_number ||
          currentUser.paymentDetails?.account_number ||
          "N/A",
        ifs_Code:
          paymentDetails.ifs_Code ||
          currentUser.paymentDetails?.ifs_Code ||
          "N/A",
      };
    }

    // Update geo location
    if (geoLocation) {
      currentUser.geoLocation = {
        lat: geoLocation.lat || currentUser.geoLocation?.lat || "N/A",
        lon: geoLocation.lon || currentUser.geoLocation?.lon || "N/A",
      };
    }

    console.log("OldData: ", req.user);
    await currentUser.save();
    console.log("NewData:", currentUser);

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: currentUser });
  } catch (error) {
    next(error);
  }
};


