import Employee from "../models/employee.model.js";

/**
 * @desc Get Profile
 * @route GET /api/profile
 */

export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = Employee.findOne({ userId: session.userId });

    if (!employee) {
      // Authenticated user is not an employee - return admin profile;

      return res.json({
        firstName: "Admin",
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
 * @route PUT /api/profile
 */

export const updateProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = Employee.findOne({ userId: session.userId });
    if (!employee) return res.status(400).json({ error: "Employee not found" });
    if (employee.isDeleted) {
      return res
        .status(403)
        .json({
          error: "your account is deactivated, you cant update your profile",
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
