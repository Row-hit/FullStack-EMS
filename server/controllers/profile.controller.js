import Employee from "../models/employee.model.js";

/**
 * @desc Get Profile
 * @route GET /api/profile
 */

export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      // Authenticated user is not an employee - return ADMIN profile;

      return res.json({
        firstName: "ADMIN",
        lastName: "",
        session: session.email,
      });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ error: "failed to fetch profile" });
  }
};

/**
 * @desc Update Profile
 * @route Post /api/profile
 */

export const updateProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    // only block normal users
    if (!employee && session.role !== "ADMIN") {
      return res.status(400).json({
        error: "Employee not found",
      });
    }

    // only check isDeleted if employee exists
    if (employee?.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated, you can't update your profile",
      });
    }

    await Employee.findByIdAndUpdate(employee._id, {
      bio: req.body.bio,
    });
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " Failed to Update Profile" });
  }
};
