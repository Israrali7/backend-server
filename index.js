require("dotenv").config();
const express = require("express")
const mongoose = require('mongoose');
const BookRoute = require("./routes/BookRoute");
const productRoute = require("./routes/productRoute")
const userAuth = require("./routes/userAuth")
const uplaodRoute = require('./routes/uploadRoute')
const cors = require("cors");

const App = express();
App.use(express.json());
App.use(cors({ origin: "http://localhost:3000"  }));

App.use("/books", BookRoute);
App.use("/products", productRoute);
App.use("/auth" , userAuth)
App.use("/pic" , uplaodRoute)



mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(2300, () => {
        console.log("DB connected and SerVer Started");
    })
}).catch((err) => {
    console.log(err);
})

