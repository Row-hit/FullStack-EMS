import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//Login for employee and ADMIN
/**
 * @desc authenticate user
 * @route POST /api/auth/login
 * @access  private
 */

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email (check both Employee and ADMIN models)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    if (role === "admin" && user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Not authorized as ADMIN",
      });
    }

    if (role === "employee" && user.role !== "EMPLOYEE") {
      return res.status(401).json({
        success: false,
        message: "Not authorized as Employee",
      });
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

/**
 * @desc Get session for employee and ADMIN
 * @route GET /api/auth/session
 */

export const session = async (req, res) => {
  const session = req.session;

  return res.json({ user: session });
};

/**
 * @desc  change password for employee and ADMIN
 * @route POST /api/auth/change-password
 */

export const changePassword = async (req, res) => {
  try {
    const session = req.session;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required",
      });
    }
    const user = await User.findById(session.userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isVerified = await bcrypt.compare(currentPassword, user.password);
    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "entered wrong password",
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed Successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res
      .status(500)
      .json({ success: false, message: " Failed to change password" });
  }
};
