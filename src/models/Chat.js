import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    response: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
