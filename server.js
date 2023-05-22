import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"



import cors from "cors"
// configure env veriable
dotenv.config();


// database config
connectDB()

// rest object
const app = express(); 

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

 
// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

 
// PORT
const port = process.env.PORT || 8080;

app.use("/*", (req, res) => {
  res.status(404).send("<h1>404 Page not Found</h1>");
});
app.listen(8080, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode on port ${port}`.bgYellow
      .red
  );
});
