import express from "express";
import { getBusDetail, searchBuses } from "../cotrollers/bus.controller.js";

const busRouter = express.Router();

busRouter.get("detail/:bus_id", getBusDetail);
busRouter.get("search/", searchBuses);

export default busRouter;
