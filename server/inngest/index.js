import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

// Create Inngest client
export const inngest = new Inngest({
  id: "fullstack-ems-2569",
});

// ---------------------------------------------------------
// Auto Checkout Employee
// Event: employee/check-out
// ---------------------------------------------------------

const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: {
      event: "employee/check-out",
    },
  },
  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    // Wait for 9 hours
    await step.sleepUntil(
      "wait-for-the-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000),
    );

    // Get attendance data
    let attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      // Get employee data
      const employee = await Employee.findById(employeeId);
      // TODO: Send reminder email to employee
      await sendEmail({
        to: employee.email,
        subject: "Attendence Check-Out Remainder",
        body: `
                <div style="max-width: 600px;">
                    <h2>Hi ${employee.firstName}, 👋</h2>
                    <p style="font-size: 16px;">You have a check-in in ${employee.department} today:</p>
                    <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${attendance?.checkIn?.toLocaleTimeString()}</p>
                    <p style="font-size: 16px;">Please make sure to check-out in one hour.</p>
                    <p style="font-size: 16px;">If you have any questions, please contact your admin.</p>
                    <br />
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;">EMS</p>
                </div>
            `,
      });

      // Wait another 1 hour
      await step.sleepUntil(
        "wait-for-the-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000),
      );

      // Get latest attendance data
      attendance = await Attendance.findById(attendanceId);

      if (!attendance?.checkOut) {
        // Set checkout time to 4 hours after check-in
        attendance.checkOut = new Date(
          new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000,
        );

        attendance.workingHours = 4;
        attendance.dayType = "Half Day";
        attendance.status = "LATE";

        await attendance.save();

        console.log("Employee automatically checked out.");
      }
    }
  },
);

// ---------------------------------------------------------
// Leave Application Reminder
// Event: leave/pending
// ---------------------------------------------------------

const leaveApplicationReminder = inngest.createFunction(
  {
    id: "leave-application-reminder",
    triggers: {
      event: "leave/pending",
    },
  },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    // Wait for 24 hours
    await step.sleepUntil(
      "wait-for-the-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );

    // TODO:
    // Get the leave application using LeaveApplication model
    // Check whether admin has already taken action
    // If still pending, send reminder email to admin

    console.log(`Checking pending leave application: ${leaveApplicationId}`);

    const leaveApplication =
      await LeaveApplication.findById(leaveApplicationId);

    if (leaveApplication?.status === "PENDING") {
     const employee = await Employee.findById(leaveApplication.employeeId);
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `Leave Application Remainder`,
        body:`
            <div style="max-width: 600px;">
                <h2>Hi Admin, 👋</h2>
                <p style="font-size: 16px;">You have a leave application in ${employee.department} today:</p>
                <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
                <p style="font-size: 16px;">Please make sure to take action on this leave application.</p>
                <br />
                <p style="font-size: 16px;">Best Regards,</p>
                <p style="font-size: 16px;">EMS</p>
            </div>
        `
      })
    }
  },
);

// ---------------------------------------------------------
// Attendance Reminder Cron
// Runs every day at 11:30 AM IST
// 11:30 AM IST = 06:00 UTC
// ---------------------------------------------------------

const attendanceReminderCron = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers: {
      cron: "TZ=Asia/Kolkata 30 11 * * *",
    },
  },
  async ({ step }) => {
    // Step 1: Get today's date range in IST
    const today = await step.run("get-today-date", async () => {
      const startUTC = new Date(
        new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        }) + "T00:00:00+05:30",
      );

      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);

      return {
        startUTC: startUTC.toISOString(),
        endUTC: endUTC.toISOString(),
      };
    });

    // Step 2: Get all active, non-deleted employees
    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();

      return employees.map((e) => ({
        _id: e._id.toString(),
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        department: e.department,
      }));
    });

    // Step 3: Get employee IDs on approved leave today
    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: {
          $lte: new Date(today.endUTC),
        },
        endDate: {
          $gte: new Date(today.startUTC),
        },
      }).lean();

      return leaves.map((leave) => leave.employeeId.toString());
    });

    // Step 4: Get employee IDs who already checked in today
    const checkedInIds = await step.run("get-checked-in-ids", async () => {
      const attendances = await Attendance.find({
        date: {
          $gte: new Date(today.startUTC),
          $lt: new Date(today.endUTC),
        },
      }).lean();

      return attendances.map((attendance) => attendance.employeeId.toString());
    });

    // Step 5: Filter absent employees
    // Not on leave AND not checked in
    const absentEmployees = activeEmployees.filter(
      (emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id),
    );

    // Step 6: Send reminder emails
    if (absentEmployees.length > 0) {
      await step.run("send-reminder-emails", async () => {
        const emailPromises = absentEmployees.map((emp) => {
          // TODO: Send email here
          sendEmail({
            to: emp.email,
            subject:`Attendance Remainder - Please Mark Your Attendance`,
            body: `
                            <div style="max-width: 600px; font-family: Arial, sans-serif;">
                                <h2>Hi ${emp.firstName}, 👋</h2>
                                <p style="font-size: 16px;">We noticed you haven't marked your attendance yet today.</p>
                                <p style="font-size: 16px;">The deadline was <strong>11:30 AM</strong> and your attendance is still missing.</p>
                                <p style="font-size: 16px;">Please check in as soon as possible or contact your admin if you're facing any issues.</p>
                                <br />
                                <p style="font-size: 14px; color: #666;">Department: ${emp.department}</p>
                                <br />
                                <p style="font-size: 16px;">Best Regards,</p>
                                <p style="font-size: 16px;"><strong>QuickEMS</strong></p>
                            </div>
                        `
          })
        });
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

// Export all Inngest functions
export const functions = [
  autoCheckOut,
  leaveApplicationReminder,
  attendanceReminderCron,
];
