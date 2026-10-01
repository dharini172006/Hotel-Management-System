import hotelRoutes from "./routes/hotelRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";
import path from "path";
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/api/hotels',hotelRoutes);
pool.connect()
.then(() =>
    console.log('Connected to PostgreSQL'))
.catch((err) => 
    console.log(err));
app.get('/',(req, res) => {
    res.send('HOTEL API running...');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});