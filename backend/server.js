import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

 

const app = express();
const PORT = process.env.PORT || 5000


app.use(express.json()); //allows to accept JSON data in the req.body

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT );
   // console.log("MONGO_URI:", process.env.MONGO_URI); 
});   
