import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  restaurantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
   preparationTime: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "veg",
      "gluten-free",
      "non-veg",
      "vegan",
      "egg",
      "contains-nuts",
      "spicy",
      "sweet",
      "jain",
      "dairy",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: ["available", "unAvailable", "removed"],
    default: "available",
  },
  image: {
    type: [
      {
        url: { type: String, required: true },
        publicID: { type: String, required: true },
      },
    ],
  },
  timestamps: true,
});

const menu = mongoose.model("Menu", menuSchema);
export default menu;
