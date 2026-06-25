import mongoose from "mongoose";

const TicketSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  date: { type: Date, required: true },
  seat_numbers: [{ type: Number, required: true }],
  total_fare: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Cancelled"],
    default: "Upcoming",
  },
  bookedAt: { type: Date, default: Date.now },
  pnr: { type: String, unique: true, required: true },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
