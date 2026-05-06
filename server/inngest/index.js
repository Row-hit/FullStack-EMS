import { Inngest } from "inngest";
import Attendance from "../models/attendance.model.js";
import LeaveApplication from "../models/leave-application.model.js";
import sendEmail from "../config/nodemailer.js";
import Employee from "../models/employee.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack-ems-test" });

// Auto checkout for employees:
const autoCheckOut = inngest.createFunction(
  { id: "auto-checkout", triggers: [{ event: "employee/checkout" }] },

  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    await step.sleepUntil(
      "wait-for-the-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000),
    );

    let attendance = await Attendance.findById(attendanceId);
    if (!attendance) return;

    if (!attendance.checkOut) {
      const employee = await Employee.findById(employeeId);
      if (!employee) return;

      await sendEmail({
        to: employee.email,
        subject: "Attendance check-out reminder",
        body: `<div>
          <h2>Hi ${employee.firstName}</h2>
          <p>Please check out.</p>
        </div>`,
      });

      await step.sleepUntil(
        "wait-for-the-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000),
      );

      attendance = await Attendance.findById(attendanceId);
      if (!attendance) return;

      if (!attendance.checkOut) {
        attendance.checkOut = new Date();
        attendance.workingHour = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";
        await attendance.save();
      }
    }
  },
);

// Leave reminder
const leaveApplicationReminder = inngest.createFunction(
  { id: "leave-application-reminder", triggers: [{ event: "leave/pending" }] },

  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    await step.sleepUntil(
      "wait-for-the-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    const leaveApplication =
      await LeaveApplication.findById(leaveApplicationId);
    if (!leaveApplication) return;

    if (leaveApplication.status === "PENDING") {
      const employee = await Employee.findById(leaveApplication.employeeId);
      if (!employee) return;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Leave Application Reminder",
        body: `<div>
          <h2>Leave pending</h2>
          <p>${employee.department}</p>
        </div>`,
      });
    }
  },
);

// Cron attendance reminder
const attendanceReminderCron = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers: [{ cron: "TZ=Asia/Kolkata 30 11 * * *" }],
  },

  async ({ step }) => {
    const today = await step.run("get-today-date", () => {
      const startUTC = new Date(
        new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        }) + "T00:00:00+5:30",
      );

      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);

      return {
        startUTC: startUTC.toISOString(),
        endUTC: endUTC.toISOString(),
      };
    });

    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();

      return (employees || []).map((e) => ({
        _id: e._id.toString(),
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        department: e.department,
      }));
    });

    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: { $lte: new Date(today.endUTC) },
        endDate: { $gte: new Date(today.startUTC) },
      }).lean();

      return (leaves || []).map((l) => l.employeeId.toString());
    });

    const checkedInIds = await step.run("get-checked-in-ids", async () => {
      const attendance = await Attendance.find({
        date: {
          $gte: new Date(today.startUTC),
          $lt: new Date(today.endUTC),
        },
      }).lean();

      return (attendance || []).map((a) => a.employeeId.toString());
    });

    const absentEmployees = activeEmployees.filter(
      (emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id),
    );

    if (absentEmployees.length > 0) {
      await step.run("send-reminders-email", async () => {
        const emailPromises = absentEmployees.map((emp) =>
          sendEmail({
            to: emp.email,
            subject: "Attendance Reminder",
            body: `<div>
              <h2>Hi ${emp.firstName}</h2>
              <p>Mark your attendance</p>
            </div>`,
          }),
        );

        await Promise.all(emailPromises);
      });
    }

    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkedIn: checkedInIds.length,
      absent: absentEmployees.length,
    };
  },
);

export const functions = [
  autoCheckOut,
  leaveApplicationReminder,
  attendanceReminderCron,
];
