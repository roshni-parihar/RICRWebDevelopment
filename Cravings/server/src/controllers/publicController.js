import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import Menu from "../models/menuSchema.js";
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
    const { id, page } = req.params;
    log(page);

    if (!id) {
      const error = new Error("All fields required");
      error.StatusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({ restaurantID: id });
  } catch (error) {
    next(error);
  }
};
