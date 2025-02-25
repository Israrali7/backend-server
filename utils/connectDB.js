const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};