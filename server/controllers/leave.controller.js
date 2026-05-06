import { inngest } from "../inngest/index.js";
import Employee from "../models/employee.model.js";
import LeaveApplication from "../models/leave-application.model.js";

/**
 * @desc crete leave
 * @route POST /api/leaves
 */

export const createLeave = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    if (employee.isDeleted) {
      return res.status(403).json({
        error: "your account is deactivated, you cant update your profile",
      });
    }

    const { type, startDate, endDate, reason } = req.body;
    if (!type || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(startDate) <= today || new Date(endDate) <= today) {
      return res.status(400).json({
        error: "Leave date must be in future",
      });
    }
    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        error: "end date cannot be before start date",
      });
    }
    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: "PENDING",
    });

    await inngest.send({
      name: "leave/pending",
      data: {
        leaveApplicationId: leave._id,
      },
    });

    return res.status(200).json({
      success: true,
      data: leave,
      message: "Leave Applied Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      error: "Failed to apply for Leave ",
    });
  }
};

/**
 * @desc get leaves
 * @route GET /api/leaves
 */

export const getLeaves = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";
    if (isAdmin) {
      const status = req.query.status;
      const where = status ? { status } : {};
      const leaves = await LeaveApplication.find(status)
        .populate("employeeId")
        .sort({ createdAt: -1 });

      const leavesData = leaves.map((leave) => {
        const obj = leave.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        };
      });

      return res.status(200).json({ leavesData });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();
      if (!employee) {
        return res.status(404).json({ error: "User not found" });
      }
      const leavesData = await LeaveApplication.find({
        employeeId: employee._id,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        leavesData,
        employee: {
          ...employee,
          id: employee._id.toString(),
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Can't fetch the data" });
  }
};

/**
 * @desc Update leave status
 * @route PATCH /api/leaves/:id
 */

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return res.status(400).json({ error: "Invaild Status" });
    }
    const leave = await LeaveApplication.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    return res
      .status(200)
      .json({ success: true, data: leave, message: "Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Can't update the data" });
  }
};
