import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_SEND_OTP_TEMPLATE,
  EMAIL_RESET_OTP_TEMPLATE,
  EMAIL_WELCOME_TEMPLATE,
} from "../config/EmailTemplate.js";
// register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // add token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    //    send email
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: email,
    //   subject: "Welcome to our app",
    //   text: `Welcome to our app ${name}. Your account has been created successfully with email id: ${email}.`,
    // };
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our app! 🎉",
      html: EMAIL_WELCOME_TEMPLATE.replace("{{name}}", name).replace(
        "{{email}}",
        email
      ),
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // add token to cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// send otp to the user for verification
export const sendOtp = async (req, res) => {
  try {
    // const { userId } = req.userId;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account is already verified",
      });
    }

    const otp = String(Math.floor(Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 1000;
    await user.save();

    // send email
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: user.email,
    //   subject: "Account verification OTP",
    //   text: `Your account verification OTP is: ${otp}. Please enter this OTP to verify your account.`,
    // };
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      html: EMAIL_SEND_OTP_TEMPLATE.replace("{{name}}", user.name).replace(
        "{{otp}}",
        otp
      ),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.json({
      success: false,
      message: "OTP is required",
    });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.json({
        success: false,
        message: "Invalid otp",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Otp expired",
      });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// send password reset otp
export const sendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for password reset",
      });
    }

    const otp = String(Math.floor(Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // send email
    // const mailOptions = {
    //   from: process.env.SENDER_EMAIL,
    //   to: user.email,
    //   subject: "Password reset OTP",
    //   text: `Your password reset OTP is: ${otp}. Please enter this OTP to reset your password.`,
    // };
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: EMAIL_RESET_OTP_TEMPLATE.replace("{{name}}", user.name).replace(
        "{{otp}}",
        otp
      ),
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { otp, email, newPassword } = req.body;
  if (!otp || !newPassword || !email) {
    return res.json({
      success: false,
      message: "OTP, Email and new password are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.json({
        success: false,
      });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Otp expired",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
