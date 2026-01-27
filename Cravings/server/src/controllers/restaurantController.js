import User from "../models/userModel.js";

export const ManagerUpdate = async (req, res, next) => {   // exported to user router
  try {
    const { fullName, email, mobileNumber } = req.body;

    const currentManager = req.user;

    if (!fullName || !email || !mobileNumber) {
      const error = new Error("All Fields Requireds");
      error.statusCode = 400;
      return next(error);
    }
    console.log(currentManager); // old user data in json format
    /*
    currentUser.fullName = fullName; // inserting update data on currentUser
    currentUser.email = email;
    currentUser.mobileNumber = mobileNumber;
    await currentUser.save();

    console.log(currentUser); // new data

    res.status(200).json({message:'User Updated Successfully'})
    */

    // second way
    const updateManager = await User.findByIdAndUpdate(
      { _id: currentManager._id },
      { fullName, email, mobileNumber },
      { new: true },
    );
    console.log("Updated Manager", updateManager);
    res.status(200).json({ message: "Manager Updated Successfully",data:updateManager });

    console.log("updating Manager");
  } catch (error) {
    next(error);
  }
};
export const ManagerChangePhoto = async (req, res, next) => {
  try {
    console.log("body: ", req.body);

    console.log("file:", req.file);

    res.status(200).json({ message: "Photo Updated" });
  } catch (error) {
    next(error);
  }
};
