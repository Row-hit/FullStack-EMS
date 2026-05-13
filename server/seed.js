import dotenv from "dotenv/config.js";
import connectDB from "./config/connectDB.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "ADMIN123";

async function registerADMIN() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (!ADMIN_EMAIL) {
      console.error("ADMIN Email env not found");
      process.exit(1);
    }

    await connectDB();

    const existingADMIN = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingADMIN) {
      console.log("User is already exist as role :", existingADMIN.role);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

    const ADMIN = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("ADMIN user is created");
    console.log("\nemail:", ADMIN.email);
    console.log("password:", TemporaryPassword);
    console.log("\n --> change the password after login !");

    process.exit(0);
  } catch (error) {
    console.error("seed failed :", error);
  }
}

registerADMIN();
