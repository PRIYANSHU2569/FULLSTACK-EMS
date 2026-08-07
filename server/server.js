import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import atttendanceRouter from "./routes/attendanceRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the FULLSTACK-EMS server!");
});
app.use("/api/auth" ,authRouter)
app.use("/api/employees" ,employeesRouter)
app.use("/api/profile" ,profileRouter)
app.use("/api/attendance" , atttendanceRouter)



await connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});