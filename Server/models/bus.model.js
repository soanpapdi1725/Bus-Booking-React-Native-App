import mongoose, { Schema } from "mongoose";

const SeatSchema = new mongoose.Schema({
  seat_id: {
    type: Number,
    required: true,
  },
  type: { type: String, enum: ["window", "side", "path"], required: true },
  booked: { type: Boolean, default: false },
});

const BusSchema = new Schema({
  bus_id: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departure: { type: String, required: true },
  arrival_time: { type: Date, required: true },
  duration: { type: String, required: true },
  available_seats: { type: Number, required: true },
  price: { type: Number, required: true },
  original_price: { type: Number, required: true },
  company: { type: String, required: true },
  bus_type: { type: String, required: true },
  rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  badges: [{ type: String }],
  seats: [[SeatSchema]],
});

const Bus = mongoose.model("Bus", BusSchema);
export default Bus;
