import { populate } from "dotenv";
import Bus from "../models/bus.model.js";
import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import { sendResponseJson } from "../utils/sendResponse.js";
import { v7 as uuidv7 } from "uuid";

export const getUserTicket = async (req, res) => {
  const userId = req.userId;
  try {
    const userBoughtTickets = await User.findOne(userId, {
      boughtTickets: true,
    })
      .populate({
        path: "boughtTickets",
        populate: {
          path: "bus",
          select:
            "bus_id from to busType company departureTime arrivalTime price",
        },
      })
      .sort({ bookedAt: -1 });

    if (!userBoughtTickets || userBoughtTickets.length === 0) {
      return sendResponseJson(res, 404, false, "No Ticket Found");
    }
    return sendResponseJson(
      res,
      200,
      true,
      "User's Bought Ticket sent successfully",
      userBoughtTickets,
    );
  } catch (error) {
    console.log("ERROR WHILE GETTING USER TICKET --> ", error);
    return sendResponseJson(res, 500, false, "Internal Server Error");
  }
};

export const bookTicket = async (req, res) => {
  try {
    const { bus_id, date, seatNumbers } = req.body;
    const userId = req.userId;

    if (!bus_id || !date || !seatNumbers || seatNumbers.length === 0) {
      return sendResponseJson(res, 400, false, "All Field is Required");
      const busExist = await Bus.findOne(bus_id);
      if (!busExist) {
        return sendResponseJson(res, 404, false, "Bus not found");
      }

      const userExist = await User.findOne(userId);
      if (!userExist) {
        return sendResponseJson(res, 404, false, "User not found");
      }
      const unavailableSeats = seatNumbers.filter((seat) =>
        busExist.seats?.some((row) =>
          row?.some(
            (busSeat) => busSeat.seat_id === seat.seat_id && seat.booked,
          ),
        ),
      );

      if (unavailableSeats > 0) {
        return sendResponseJson(
          res,
          400,
          false,
          "Seats are filling fast, Secure your fast",
        );
      }
      const total_fare = busExist.price * seatNumbers.length;
      const newTicket = await Ticket({
        user: userExist._id,
        bus: busExist._id,
        date: date,
        seat_numbers: seatNumbers,
        total_fare: total_fare,
        pnr: uuidv7().slice(0, 10).toUpperCase(),
      });

      await newTicket.save();

      busExist.seats.forEach((row) => {
        row.forEach((seat) => {
          if (seatNumbers.includes(seat)) {
            seat.booked = true;
          }
        });
      });
      await busExist.save();

      return sendResponseJson(
        res,
        200,
        true,
        "New Ticket is created",
        newTicket,
      );
    }
  } catch (error) {
    console.log("ERROR WHILE BOOKING USER TICKET --> ", error);
    return sendResponseJson(res, 500, false, "Internal Server Error");
  }
};
