import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { sendResponseJson } from "../utils/sendResponse.js";
import User from "../models/user.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Generate token function generating token for new and existing user
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );

  return { accessToken, refreshToken };
};

// Google login & signup
export const loginOrSignupGoogle = async (req, res) => {
  const { id_token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub: google_id, name, picture, email_verified } = payload;
    if (!email_verified) {
      return sendResponseJson(res, 400, false, "Email not verified by Google");
    }
    let user = await User.findOne({
      email,
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = new User({
        google_id,
        email,
        name,
        user_photo: picture,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await user.save();
    }
    return sendResponseJson(
      res,
      200,
      true,
      "User logged In Successfully",
      generateTokens(user),
    );
  } catch (err) {
    console.log("ERROR WHILE GOOGLE LOGIN/SIGNUP --> ", error);
    return sendResponseJson(
      res,
      500,
      false,
      "Failed to authenticate with google",
    );
  }
};

// refresh Token
export const refreshToken = async (req, res) => {
  const { refreshToken: reqRefreshToken } = req.body;
  if (!reqRefreshToken) {
    return sendResponseJson(res, 401, false, "No Refresh Token found");
  }
  try {
    const decoded = jwt.verify(
      reqRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendResponseJson(res, 404, false, "User Not found");
    }
    const newAccessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );

    return sendResponseJson(
      res,
      200,
      true,
      "User Verified using Refresh Token",
      { newAccessToken },
    );
  } catch (error) {
    console.log("ERROR WHILE REFRESHING TOKEN --> ", error);
    return sendResponseJson(
      res,
      500,
      false,
      "Failed to authenticate with google",
    );
  }
};
