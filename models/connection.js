const mongoose = require("mongoose");

const connectTODB = async () =>
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });


module.exports = connectTODB;
