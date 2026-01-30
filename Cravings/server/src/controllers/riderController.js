import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

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
   const dp= req.file;

   if(!dp){
    const error = new Error("Profile Picture Required");
    error.statusCode = 400;
    return next(error);
   }
   console.log("DP:", dp);

   if(currentRider.photo.publicID){
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
