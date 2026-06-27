import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { mongoConnect } from "./config/connect.js";
import { PORT } from "./config/config.js";
import authRouter from "./routes/user.routes.js";
import busRouter from "./routes/bus.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import { buildAdminJs } from "./config/setup.js";
import "./cron/busCron.js";
import { startBusCron } from "./cron/busCron.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  allowHeader: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bus", busRouter);
app.use("/api/v1/tickets", ticketRouter);
const start = async () => {
  try {
    await mongoConnect(process.env.MONGODB_URI);
    await buildAdminJs(app);
    await startBusCron();
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server started on http://localhost:${PORT}/admin`);
      }
    });
  } catch (error) {
    console.log("Error while starting server: ", error);
  }
};
start();
