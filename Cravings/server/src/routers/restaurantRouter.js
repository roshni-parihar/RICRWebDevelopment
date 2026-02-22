import express from "express";
import multer from "multer";

import {
  RestaurantAddMenuItem,
  GetRestaurantMenuItem,
  ManagerUpdate,
  ManagerChangePhoto,
  ManagerResetPassword,
  GetAllPlacedOrder,
    RestaurantOrderStatusUpdate
} from "../controllers/restaurantController.js";
import { ManagerProtect, Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);
router.put("/update", Protect, ManagerUpdate);
router.patch(
  "/changePhoto",
  Protect,
  upload.single("image"),
  ManagerChangePhoto,
);
router.patch("resertPassword", Protect, ManagerResetPassword);

router.get("/menuItems", Protect, ManagerProtect, GetRestaurantMenuItem);
router.put(
  "/updateMenuItem/:id",// fetching item by id 
  Protect,
  ManagerProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);

//router.patch("/restaurant/uploadImages",Protect,uploadRestaurantImages)

router.get("/placedOrders", Protect, ManagerProtect, GetAllPlacedOrder);

router.patch(
  "/orders/:id/updateorderstatus",
  Protect,
  ManagerProtect,
  RestaurantOrderStatusUpdate,
);

export default router;
