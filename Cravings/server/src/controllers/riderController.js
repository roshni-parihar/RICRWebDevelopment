import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const RiderUpdate = async (req, res, next) => {
  // exported to rider router
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

    const currentRider = req.user;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !gender ||
      !dob ||
      !address ||
      !city ||
      !pin ||
      !documents ||
      !paymentDetails ||
      !geolocation
    ) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentRider); // old user data in json format

    currentRider.fullName = fullName; // inserting update data on currentUser
    currentRider.email = email;
    currentRider.mobileNumber = mobileNumber;
    currentRider.gender = gender;
    currentRider.dob = dob;
    currentRider.address = address;
    currentRider.city = city;
    currentRider.pin = pin;
    currentRider.documents = documents;
    currentRider.paymentDetails = paymentDetails;
    currentRider.geolocation = geolocation;

    await currentRider.save();

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: currentRider });

    /*
    // second way
    const updateRider = await User.findByIdAndUpdate(
      { _id: currentRider._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated Rider", updateRider);
    res.status(200).json({ message: "Rider Updated Successfully",data:updateRider});
*/
    console.log("updating rider");
  } catch (error) {
    next(error);
  }
};
export const RiderChangePhoto = async (req, res, next) => {
  try {
    //console.log("body: ", req.body);

    const currentRider = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile Picture Required");
      error.statusCode = 400;
      return next(error);
    }
    console.log("DP:", dp);

    if (currentRider.photo.publicID) {
      await cloudinary.uploader.destroy(currentRider.photo.publicID);
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
    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};

export const RiderResetPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const currentRider = req.user;

    if (!oldPassword || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    // checking that rider's entered oldpassword is same as currentRider's password stored in database
    const isVerified = await bcrypt.compare(
      oldPassword,
      currentRider.newPassword,
    );

    // if not ..showing errors
    if (!isVerified) {
      const error = new Error("Old Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    // hashing newPassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    currentRider.password = hashPassword;
    await currentRider.save();
    res.status(200).json({ message: "Password Reset Succefully" });
    
  } catch (error) {
    next(error);
  }
};

export const RiderGetAvailableOrder = async (req,res,next)=>{
  try {
    
    const availableOrders = await Order.fiind({riderId:null,
      status:{
        $ne:"pending",
        $ne: "cancelled",
        $ne: "delivered",
        $ne: "rejected",
      }, // $ne means Not Equal. It Exclude orders that are pending, cancelled, delivered, or rejected
    }).populate("userId").populate("restaurantId");

     res.status(200).json({
      message: "Available Orders Fetched Successfully",
      data: availableOrders,
    });
  } catch (error) {
    next(error);
  }
}

export const RiderGetOngoingOrder = async(req,res,next)=>{
  try {
    const currentuser = req.user;
    const ongoingOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["accepted", "preparing", "ready", "pickedUp", "onTheWay"],
      }, // $in means "is in". It Include orders that are accepted, preparing, ready, pickedUp, or onTheWay
    })
      .populate("userId")
      .populate("restaurantId");

    // if (ongoingOrders.length === 0) {
    //   const error = new Error("No Ongoing Orders Found");
    //   error.status = 404;
    //   return next(error);
    // }
    res.status(200).json({
      message: "Ongoing Orders Fetched Successfully",
      data: ongoingOrders,
    });
  } catch (error) {
    next(error);
  }
}

export const RiderGetCompletedOrder = async(req,res,next)=>{
    try {
    const currentuser = req.user;
    const completedOrders = await Order.find({
      riderId: currentuser._id,
      status: {
        $in: ["delivered", "refused", "damaged", "cancelled", "rejected"],
      }, // $in means "is in". It Include orders that are delivered, refused, damaged, cancelled, or rejected
    })
      .populate("userId")
      .populate("restaurantId");

    res.status(200).json({
      message: "Completed Orders Fetched Successfully",
      data: completedOrders,
    });
  } catch (error) {
    next(error);
  }
}