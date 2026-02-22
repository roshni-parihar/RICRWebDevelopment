import express from "express";
import {
  RiderUpdate,
  RiderChangePhoto,RiderResetPassword, RiderGetAvailableOrder,
  RiderGetCompletedOrder,
  RiderGetOngoingOrder,
} from "../controllers/riderController.js";

import { Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const Uploads = multer();

router.put("/update", Protect, RiderUpdate);
router.patch(
  "/changePhoto",
  Protect,
  Uploads.single("image"),
  RiderChangePhoto,
);
router.patch("/resetPassword", Protect, RiderResetPassword);

router.get("/availableOrder", Protect, PartnerProtect, RiderGetAvailableOrder);
router.get("/ongoingOrder", Protect, PartnerProtect, RiderGetOngoingOrder);
router.get("/completedOrder", Protect, PartnerProtect, RiderGetCompletedOrder);

export default router;