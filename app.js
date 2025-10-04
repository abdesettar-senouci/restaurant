import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import reservationRouter from "./routes/reservation.routes.js"; 
import orderRouter from "./routes/order.routes.js";
import menuRouter from "./routes/menu.routes.js";
import tableRouter from "./routes/table.routes.js";
import { connect } from "mongoose";
import connectToDatabase from "./database/mongodb.js";


const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);// not working
app.use('/api/v1/users', userRouter);// not working don't try to implement it now
app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/tables', tableRouter);

app.get("/", (req, res) => {
  res.send("Restaurant API is running!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
