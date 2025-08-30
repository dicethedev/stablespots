import mongoose from "mongoose";

//enum: pending, approved, rejected

const PendingBusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  wallet: { type: String, required: false },
  website: { type: String, required: false },
  acceptsUSDC: { type: Boolean, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export const PendingBusiness =
  mongoose.models.PendingBusiness ||
  mongoose.model("PendingBusiness", PendingBusinessSchema);
