import User from "../models/userModel.js";

export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber } = req.body;

    const currentUser = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentUser); // old user data in json format
    /*
    currentUser.fullName = fullName; // inserting update data on currentUser
    currentUser.email = email;
    currentUser.mobileNumber = mobileNumber;
    await currentUser.save();

    console.log(currentUser); // new data

    res.status(200).json({message:'User Updated Successfully'})
    */

    // second way
    const updateUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated User", updateUser);
    res.status(200).json({ message: "User Updated Successfully",data:updateUser });

    console.log("updating user");
  } catch (error) {
    next(error);
  }
};
