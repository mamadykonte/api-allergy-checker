require("dotenv").config();

const express = require("express");
const app = express();

// mongoose connnection
const connectDB = require("./models/connection");

// routes
const userRoutes = require("./routes/users");

app.use(express.json());

// app.get("/", (req, res) => {
//   res.set("Content-Type", "text/html");
//   res.send("Hello world !!");
// });
app.use("/user", userRoutes);

app.listen(4000, () =>
  connectDB()
    .then((data) => console.log("Server is running 🚀 http://localhost:4000"))
    .catch((error) => console.log(error))
);
