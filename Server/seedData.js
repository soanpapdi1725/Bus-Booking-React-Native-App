export const locations = [
  "Lucknow",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Indore",
  "Surat",
  "Nagpur",
  "Patna",
  "Bhopal",
  "Chandigarh",
  "Goa",
  "Visakhapatnam",
  "Guwahati",
  "Ranchi",
];

export const buses = [
  {
    bus_id: "bus_001",
    company: "Sethi Yatra",
    bus_type: "A/C Seater",
    price: 899,
    original_price: 999,
    rating: 4.5,
    total_reviews: 720,
    badges: ["Comfortable Ride", "Well Maintained"],
  },
  {
    bus_id: "bus_002",
    company: "RedBus Travels",
    bus_type: "A/C Sleeper",
    price: 999,
    original_price: 1099,
    rating: 4.7,
    total_reviews: 950,
    badges: ["Highly Rated", "New Bus"],
  },
  {
    bus_id: "bus_003",
    company: "GoBus",
    bus_type: "Non-A/C Seater",
    price: 699,
    original_price: 799,
    rating: 4.2,
    total_reviews: 530,
    badges: ["Affordable", "Great Service"],
  },
  {
    bus_id: "bus_004",
    company: "National Express",
    bus_type: "A/C Sleeper",
    price: 1199,
    original_price: 1299,
    rating: 4.8,
    total_reviews: 1100,
    badges: ["Premium Experience", "Fast Service"],
  },
  {
    bus_id: "bus_005",
    company: "GreenLine Travels",
    bus_type: "Non-A/C Sleeper",
    price: 799,
    original_price: 899,
    rating: 4.1,
    total_reviews: 400,
    badges: ["Budget Friendly", "Good Seats"],
  },
];

export const generateSeats = () => {
  const seats = [];
  for (let i = 1; i <= 28; i++) {
    let seatType;

    if (i > 24) {
      seatType = i % 4 === 1 ? "window" : "side";
    } else {
      seatType = i % 4 === 1 ? "window" : i % 4 === 2 ? "path" : "side";
    }

    seats.push({
      seat_id: i,
      type: seatType,
      booked: false,
    });
  }
  return Array(7)
    .fill()
    .map((_, row) => seats.slice(row * 4, row * 4 + 4));
};
