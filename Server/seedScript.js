import dotenv from "dotenv";

import { buses, generateSeats, locations } from "./seedData.js";
import Bus from "./models/bus.model.js";
dotenv.config();

const generateRandomTime = (baseDate) => {
  const hour = Math.floor(Math.random() * 12 + 6);
  const minutes = Math.random() > 0.5 ? 30 : 0;

  const dateTime = new Date(baseDate);
  dateTime.setHours(hour, minutes, 0, 0);

  return dateTime;
};

export const seedDatabase = async () => {
  try {
    await Bus.deleteMany();
    console.log("Old Bus Data Deleted");
    const busesToInsert = [];

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const from = locations[i];
        const to = locations[j];

        const baseDate = new Date();

        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const travelDate = new Date(baseDate);
          travelDate.setDate(travelDate.getDate() + dayOffset);

          const returnDate = new Date(travelDate);
          returnDate.setDate(returnDate.getDate() + 1);

          buses.forEach((bus) => {
            const departure = generateRandomTime(travelDate);
            const arrival_time = generateRandomTime(travelDate);
            const duration = Math.ceil(Math.random() * 10);
            busesToInsert.push({
              bus_id: `${bus.bus_id}_${from}_${to}_${dayOffset}`,
              from,
              to,
              departure,
              arrival_time,
              bus_type: bus.bus_type,
              duration:
                duration < 2
                  ? "5h 00m"
                  : duration < 4
                    ? "6h 30m"
                    : duration < 6
                      ? "8h 00m"
                      : "10h 30m",
              available_seats: 28,
              original_price: bus.original_price,
              price: bus.price,
              company: bus.company,
              rating: bus.rating,
              total_reviews: bus.total_reviews,
              badges: bus.badges,
              seats: generateSeats(),
            });
            busesToInsert.push({
              bus_id: `${bus.bus_id}_${to}_${from}_${dayOffset + 1}`,
              from: to,
              to: from,
              departure: generateRandomTime(returnDate),
              arrival_time: generateRandomTime(returnDate),
              duration:
                duration < 2
                  ? "5h 00m"
                  : duration < 4
                    ? "6h 30m"
                    : duration < 6
                      ? "8h 00m"
                      : "10h 30m",
              available_seats: 28,
              bus_type: bus.bus_type,
              original_price: bus.original_price,
              price: bus.price,
              company: bus.company,
              rating: bus.rating,
              total_reviews: bus.total_reviews,
              badges: bus.badges,
              seats: generateSeats(),
            });
          });
        }
      }
    }

    await Bus.insertMany(busesToInsert);
    console.log("Database seeded successfully");
  } catch (error) {
    console.log("ERROR SEEDING DATABASE: ", error);
  }
};
