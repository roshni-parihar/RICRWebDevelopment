import express from "express";
import multer from "multer";
import {
  NewContact,
  GetAllRestaurants,
  GetRestaurantMenuData,
  uploadRestaurantImages,
} from "../controllers/publicController.js";
import { Protect, ManagerProtect } from "../middlewares/authMiddleware.js";
const router = express.Router();
const upload = multer();

router.post("/new-contact", NewContact);
router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant/menu/:id", GetRestaurantMenuData);
router.post(
  "/addRestaurantImages",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  uploadRestaurantImages,
);
export default router;
