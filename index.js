require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// mongoose connnection
const connectDB = require("./models/connection");

// routes
const userRoutes = require("./routes/users");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("Hello world !!");
});
app.use("/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () =>
  connectDB()
    .then((data) => console.log("Server is running 🚀"))
    .catch((error) => console.log(error))
);
