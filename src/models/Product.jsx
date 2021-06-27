import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  process_title: {
    type: String,
    required: [true, "Process title is required!"],
    trim: true,
  },
  sub_process_name: {
    type: String,
    required: [true, "Sub process name is required!"],
    trim: true,
  },
  sub_process_version: {
    type: String,
    required: [true, "Sub process version is required!"],
    trim: true,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
