import User from "../models/userModel.js";

export const RiderUpdate = async (req, res, next) => {   // exported to rider router
  try {
    const { fullName, email, mobileNumber } = req.body;

    const currentRider = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentRider); // old user data in json format
    /*
    currentUser.fullName = fullName; // inserting update data on currentUser
    currentUser.email = email;
    currentUser.mobileNumber = mobileNumber;
    await currentUser.save();

    console.log(currentUser); // new data

    res.status(200).json({message:'User Updated Successfully'})
    */

    // second way
    const updateRider = await User.findByIdAndUpdate(
      { _id: currentRider._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated Rider", updateRider);
    res.status(200).json({ message: "Rider Updated Successfully",data:updateRider});

    console.log("updating user");
  } catch (error) {
    next(error);
  }
};
export const RiderChangePhoto = async (req, res, next) => {
  try {
    console.log("body: ", req.body);

    console.log("file:", req.file);

    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};
