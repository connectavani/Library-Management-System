import mongoose from "mongoose";
import roleModel from "../models/role.model.js";
import userModel from "../models/user.model.js";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export const initializeAdmin = async () => {
  try {
    const roleData = [
      {
        _id: new mongoose.Types.ObjectId("64f53a3bfec13c001d9bfa01"),
        roleName: "Admin",
      },
      {
        _id: new mongoose.Types.ObjectId("64f53a3bfec13c001d9bfa02"),
        roleName: "User",
      }
    ];

    // Check which roles already exist
    const existingRoles = await roleModel
      .find({ roleName: { $in: roleData.map((r) => r.roleName) } })
      .lean();
    const existingRoleNames = existingRoles.map((role) => role.roleName);

    // Create missing roles
    for (const role of roleData) {
      if (!existingRoleNames.includes(role.roleName)) {
        await roleModel.create(role);
        console.log(`✅ Role "${role.roleName}" created with ID ${role._id}.`);
      }
    }

    const adminRole = await roleModel.findOne({ roleName: "Admin" });

    const adminUserId = new mongoose.Types.ObjectId("64f53a3bfec13c001d9bfa22");

    const adminUser = await userModel.findOne({
      $or: [{ _id: adminUserId }, { email: adminEmail }],
    });

    if (!adminUser) {
    //   const hashedPassword = await bcrypt.hash(adminPassword, 10); // Use environment variables in production
      await userModel.create({
        _id: adminUserId,
        firstName: "admin",
        lastName: "admin",
        email: adminEmail,
        password: adminPassword,
        roleName: adminRole.roleName,
        isAuthenticated: true,
        roleId: adminRole._id,
      });
      console.log("✅ Admin user created with custom ID.");
    } else {
      console.log("ℹ️  Admin user already exists.");
    }
  } catch (err) {
    console.error("❌ Error initializing roles and admin user:", err);
  }
};
