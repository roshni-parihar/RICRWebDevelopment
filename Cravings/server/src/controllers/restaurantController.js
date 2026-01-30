import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const ManagerUpdate = async (req, res, next) => {   // exported to user router
  try {
    const { fullName,
      email,
      mobileNumber,
      gender,
      dob,
      address,
      city,
      pin,
      documents,
      paymentDetails,
      geolocation, } = req.body;

    const currentManager = req.user;

    if (!fullName ||
      !email ||
      !mobileNumber ||
      !gender ||
      !dob ||
      !address ||
      !city ||
     ! pin ||
     ! documents ||
      !paymentDetails ||
      !geolocation) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentManager); // old user data in json format
    
    currentManager.fullName = fullName; // inserting update data on currentUser
    currentManager.email = email;
    currentManager.mobileNumber = mobileNumber;
    await currentManager.save();

    console.log(currentManager); // new data

    res.status(200).json({message:'Manager Updated Successfully'})
    
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
   const dp= req.file;

   if(!dp){
    const error =new Error("Profile Picture Required");
    error.statusCode =400;
    return next(error);
   }
   console.log("DP:",dp);

   if(currentManager.photo.publicID){
    await cloudinary.uploader.destroy(currentManager.photo.publicID);
   }

   const b64 = Buffer.from(dp.buffer).toString("base64");

   const dataURI = `data:${dp.mimetype};base64,${b64}`;
   console.log("DataURI:", dataURI.slice(0,100));
   
   const result = await cloudinary.uploader.upload(dataURI,{
    folder:"Cravings/User",
    width: 500,
    height: 500,
    crop:"fill",
   });

   console.log("Image Uploaded Successfully", result);
   currentManager.photo.url = result.secure_url;
   currentManager.photo.publicID= result.public_id;
   
   await currentManager.save();

    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};
