import Employee from "../models/employee.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationMail from "../utils/sendVerificationMail.js";

/**
 * @desc  GET all employees
 * @route GET   /api/employees
 * @access public
 */

export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    const where = {};

    if (department) where.department = department;
    const employees = await Employee.find(where)
      .sort({ createdAt: -1 })
      .populate("userId", "email role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to  fetch Employees" });
  }
};

/**
 * @desc  Create a Employee
 * @route POST  /api/employees
 * @access private
 */

export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deduction,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !department) {
      return res.status(400).json({
        error:
          "Please provide all required fields: firstName, lastName, email, department, position",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
    });

    try {
      // Create employee
      const employee = await Employee.create({
        userId: user._id,
        firstName,
        lastName,
        email,
        phone,
        position,
        department: department || "Engineering",
        basicSalary: Number(basicSalary) || 0,
        allowances: Number(allowances) || 0,
        deduction: Number(deduction) || 0,
        joinDate: new Date(joinDate),
        bio: bio || "",
      });
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      await sendVerificationMail(user.email, token);

      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee,
      });
    } catch (employeeError) {
      // rollback user creation
      await User.findByIdAndDelete(user._id);

      throw employeeError;
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exist" });
    }
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc  verify  Employee
 * @route GET   /api/employees/verify-email/:token
 * @access public
 */
export const verifyEmployee = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isVerified = true;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * @desc  Update a Employee
 * @route PUT   /api/employees/:id
 * @access private
 */

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      password,
      role,
      bio,
      employmentStatus,
    } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ error: "Employee not found !" });
    }

    // update employee data
    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      employmentStatus: employmentStatus || "ACTIVE",
      bio: bio || "",
    });

    //update user record
    const userUpdate = { email };
    if (role) userUpdate.role = role;
    if (password) userUpdate.password = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(employee.userId, userUpdate);

    return res.status(204).json({
      success: true,
      message: "updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exist" });
    }
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

/**
 * @desc  Delete a Employee
 * @route DELETE  /api/employees/:id
 * @access private
 */

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).json({ error: "Employee not found !" });
    }

    employee.isDeleted = true;
    employee.employmentStatus = "INACTIVE";
    await employee.save();
    return res.status(204).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete employee",
    });
  }
};
