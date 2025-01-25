require("dotenv").config();
const express = require("express")
const mongoose = require('mongoose');
const BookRoute = require("../routes/BookRoute");
const productRoute = require("../routes/productRoute")
const userAuth = require("../routes/userAuth")
const uplaodRoute = require('../routes/uploadRoute')
const cors = require("cors");
const connectDB = require("../utils/connectDB");

const App = express();
App.use(express.json());
// App.use(cors({ origin: "http://localhost:3000"  }));
App.use(cors());

App.use("/books", BookRoute);
App.use("/products", productRoute);
App.use("/auth" , userAuth)
App.use("/pic" , uplaodRoute)

App.get("/", (req, res) => {
    res.json({
        message: "Server is running ok!"
    })
})

App.listen(3000, () => {
    console.log("Server is running");
    connectDB();
})