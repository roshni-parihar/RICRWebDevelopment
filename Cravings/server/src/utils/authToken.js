import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = {
      // payload is a actual data that we want to encrpt or making a token so, that it shouldn't be accessed by 3rd party
      id: user._id,
      role: user.role || "admin",
    };
    // token generation done here..-> payload is encrypted as JWT_secret
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d", // it is a timeline
    });
    console.log(token);

    res.cookie("parleG", token, {
      // here that jwt is saved in cookie and send it over to ..frontend.. secretly
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false, // secure is false here cause code is runninng on localhost, at time of deploying it will be secure

      // lax is a mode of cookie so that it can be used in thunderClient
      sameSite: "lax",
    });
  } catch (error) {
    throw error;
  }
};

export const genOtpToken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    console.log(token);

    res.cookie("otpToken", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  } catch (error) {
    throw error;
  }
};
