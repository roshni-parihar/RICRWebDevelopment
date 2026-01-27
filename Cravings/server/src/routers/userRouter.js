import express from "express";
import { UserUpdate,UserChangePhoto } from "../controllers/userController.js";
import { RiderUpdate,RiderChangePhoto } from "../controllers/riderController.js";
import { ManagerUpdate,ManagerChangePhoto } from "../controllers/restaurantController.js";
import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.put("/update", Protect, UserUpdate);
router.patch("/changePhoto", Protect, Uploads.single("image"), UserChangePhoto);

router.put("/update", Protect, RiderUpdate);
router.patch("/changePhoto", Protect, Uploads.single("image"), RiderChangePhoto);

router.put("/update", Protect, ManagerUpdate);
router.patch("/changePhoto", Protect, Uploads.single("image"), ManagerChangePhoto);


export default router;
