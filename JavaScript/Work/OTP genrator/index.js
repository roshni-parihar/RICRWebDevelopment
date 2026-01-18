function otpGenrator() {
  return Math.floor(Math.random() * 9000) + 10000;
}
let otp = otpGenrator();
console.log(otp);
