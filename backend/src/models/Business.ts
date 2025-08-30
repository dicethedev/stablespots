import mongoose, { Schema, Document, Model } from "mongoose";

interface IBusiness extends Document {
  name: string;
  category: string;
  lat: number;
  lng: number;
  acceptsUSDC: boolean;
  description: String;
  contactEmail: String;
  walletAddress?: string | null;
  website?: string | null;
  status: "pending" | "approved" | "rejected"; //enum of pending, approved, rejected
  createdAt: Date; 
  updatedAt: Date; 
}

const BusinessSchema: Schema<IBusiness> = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  walletAddress: { type: String, required: false },
  website: { type: String, required: false },
  acceptsUSDC: { type: Boolean, required: true },
  description: { type: String },  // short info about the business
  contactEmail: { type: String },  
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  
}, 
 { timestamps: true }
);

export const Business: Model<IBusiness> =
  mongoose.models.Business || mongoose.model<IBusiness>("Business", BusinessSchema);
