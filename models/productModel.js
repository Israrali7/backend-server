const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
}, 
{
    timestamps: true // Adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model("Product", productSchema);
