import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const UserUpdate = async (req, res, next) => {
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
    } = req.body;

    const currentUser = req.user;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !gender ||
      !dob ||
      !address ||
      !city ||
     ! pin ||
     ! documents ||
      !paymentDetails ||
      !geolocation
    ) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentUser); // old user data in json format

    currentUser.fullName = fullName; // inserting update data on currentUser
    currentUser.email = email;
    currentUser.mobileNumber = mobileNumber;
    currentUser.gender = gender;
    currentUser.dob = dob;
    currentUser.address = address;
    currentUser.city = city;
    currentUser.pin = pin;
    currentUser.documents = documents;
    currentUser.paymentDetails = paymentDetails;
    currentUser.geolocation = geolocation;

    await currentUser.save();

    console.log(currentUser); // new data

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: currentUser });

    // second way

    /*const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated User", updatedUser);

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: updatedUser });*/

    console.log("updating user");
  } catch (error) {
    next(error);
  }
};
export const UserChangePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);

    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile Picture Required");
      error.statusCode = 400;
      return next(error);
    }
    console.log("DP:", dp);

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");

    const dataURI = `data:${dp.mimetype};base64,${b64}`; //mimetype defines the file type- jpeg, png etc
    console.log("DataURI:", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Cravings/User",
      width: 500,
      height: 500,
      crop: "fill",
    });
    console.log("Image Uploaded Successfully", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.public_id;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};
