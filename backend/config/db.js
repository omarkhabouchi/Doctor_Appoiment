const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect('mongodb://127.0.0.1:27017/DoctoApp');
    console.log("mongo connect successfully");
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

module.exports = connectDB;
