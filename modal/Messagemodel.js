import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true
    }
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, { timestamps: true }); 

const MessageModel = mongoose.model("messages", messageSchema);
export default MessageModel;
