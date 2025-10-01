const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample menu data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 12.99,
    image: "pizza.jpg",
  },
  // Add more menu items here
];

// Routes
app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

// Booking route
app.post("/api/book", (req, res) => {
  const { name, email, date, time, guests } = req.body;
  // Here you would typically save this to a database
  console.log("New booking:", { name, email, date, time, guests });
  res.json({ message: "Booking received successfully!" });
});

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  // Here you would typically save this to a database
  console.log("New contact message:", { name, email, message });
  res.json({ message: "Message received successfully!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
