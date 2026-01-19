import jwt from "jsonwebtoken";

export const genToken = async (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role || "admin",
    };
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    res.cookie("parleG",token,{
        maxAge:1000*60*60*24,
        httpOnly:true,
        secure:false,
        // lax is a mode of cookie so that it can be used in thunderClient
        sameSite:'lax',
    })
    
  } catch (error) {
    throw error;
  }
};
