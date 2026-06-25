import Bus from "../models/bus.model.js";
import { sendResponseJson } from "../utils/sendResponse.js";

export const getBusDetail = async (req, res) => {
  try {
    const { bus_id } = req.params;
    if (!bus_id) {
      return sendResponseJson(res, 400, false, "Bus Id is Invalid");
    }
    const bus = await Bus.findOne({ _id: bus_id });
    if (!bus) {
      return sendResponseJson(res, 404, false, "Bus not found");
    }
    return sendResponseJson(res, 200, true, "Bus Found Successfully", bus);
  } catch (err) {
    console.log("ERROR WHILE GETTING BUS DETAILS --> ", error);
    return sendResponseJson(res, 500, false, "Failed to Find The Bus Detail");
  }
};

export const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return sendResponseJson(
        res,
        400,
        false,
        "Fields require to search the bus is empty",
      );
    }

    const today = new Date();
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    const isToday =
      selectedDate.getDate === today.getDate &&
      selectedDate.getMonth === today.getMonth &&
      selectedDate.getFullYear === today.getFullYear;
    let availableBuses;
    if (!isToday) {
      availableBuses = await Bus.find({
        from: from,
        to: to,
        departure: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
    } else {
      availableBuses = await Bus.find({
        from: from,
        to: to,
        departure: {
          $gte: today,
          $lte: endOfDay,
        },
      });
    }
    // send available buses to users
    return sendResponseJson(
      res,
      200,
      true,
      "Bus Searches Found Successfully",
      availableBuses,
    );
  } catch (error) {
    console.log("ERROR WHILE SEARCHING BUS --> ", error);
    return sendResponseJson(res, 500, false, "Failed to Search The Bus");
  }
};
