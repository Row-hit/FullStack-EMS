import dotenv from "dotenv/config.js";
import connectDB from "./configDB/connectDB.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (!ADMIN_EMAIL) {
      console.error("Admin Email env not found");
      process.exit(1);
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("User is already exist as role :", existingAdmin.role);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

    const admin = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin user is created");
    console.log("\nemail:", admin.email);
    console.log("password:", TemporaryPassword);
    console.log("\n --> change the password after login !");

    process.exit(0);
  } catch (error) {
    console.error("seed failed :", error);
  }
}

registerAdmin();
