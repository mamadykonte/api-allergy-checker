require("dotenv").config();
require("colors");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// mongoose connnection
connectDB();

const app = express();
// routes
const userRoutes = require("./routes/userRoutes");
const allergenRoutes = require("./routes/allergenRoutes");
const historieRoutes = require("./routes/historieRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(cors());
  
app.use(express.json());

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("Hello world !!");
});
app.use("/user", userRoutes);
app.use("/allergen", allergenRoutes);
app.use("/histories",historieRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running 🚀 in ${process.env.MODE_ENV} mode on http://localhost:${PORT}..`
      .yellow.bold
  )
);
