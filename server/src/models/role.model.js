import mongoose from "mongoose";

const roleClaimSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  actionId: { type: String },
  claimType: { type: String },
  claimValue: { type: String },
});

const roleSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true },
    claims: [roleClaimSchema],
  },
  { timestamps: true }
);

const roleModel = mongoose.model("Role", roleSchema);

export default roleModel;
