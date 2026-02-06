import express from "express";

import {
  UserUpdate,
  UserChangePhoto,
  UserResetPassword,
} from "../controllers/userController.js";
import {
  RiderUpdate,
  RiderChangePhoto,RiderResetPassword
} from "../controllers/riderController.js";

import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.put("/update", Protect, UserUpdate);
router.patch("/changePhoto", Protect, Uploads.single("image"), UserChangePhoto);
router.patch("/resetPassword", Protect, UserResetPassword);

router.put("/update", Protect, RiderUpdate);
router.patch(
  "/changePhoto",
  Protect,
  Uploads.single("image"),
  RiderChangePhoto,
);
router.patch("/resetPassword", Protect, RiderResetPassword);



export default router;
