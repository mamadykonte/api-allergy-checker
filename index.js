require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// mongoose connnection
const connectDB = require("./models/connection");

// routes
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("Hello world !!");
});
app.use("/user", userRoutes);

app.listen(process.env.PORT, () =>
  connectDB()
    .then((data) => console.log("Server is running 🚀"))
    .catch((error) => console.log(error))
);
