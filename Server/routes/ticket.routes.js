import express from "express";
import { getUserTicket, bookTicket } from "../cotrollers/ticket.cotroller.js";
import { verifyToken } from "../middleware/middleware.js";

const ticketRouter = express.Router();

ticketRouter.get("/my-tickets", verifyToken, getUserTicket);
ticketRouter.post("/book", verifyToken, bookTicket);

export default ticketRouter;
