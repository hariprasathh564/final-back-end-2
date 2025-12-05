import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    link: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
