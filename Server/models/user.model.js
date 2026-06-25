import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  google_id: { type: String },
  phone: { type: String },
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_photo: { type: String },
  boughtTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
