import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required:Date.now,
    expires: 300,
  },
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
