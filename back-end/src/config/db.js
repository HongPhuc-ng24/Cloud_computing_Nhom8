const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(
      "mongodb+srv://phuc100662:w5wVbrX6eaMKBsQu@cluster0.kkdpq.mongodb.net/reactjs?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB Connected....", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection fail...", error);
    process.exit(1);
  }
};

module.exports = connectDB;
