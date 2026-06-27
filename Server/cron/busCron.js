import cron from "node-cron";
import { seedDatabase } from "../seedScript.js";

export const startBusCron = () => {
  console.log("cron job Running...");
  cron.schedule("0 0 */7 * *", async function () {
    try {
      console.log("Cleaning previous bus routes & creating new bus routes");
      await seedDatabase();
      console.log("previous bus routes cleaned and new bus routes created");
    } catch (error) {
      console.log("Error while doing cron job for buses");
    }
  });
};
