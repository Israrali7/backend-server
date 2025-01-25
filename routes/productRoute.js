const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const result = await productModel.find({});
        res.status(200).json({
            isSuccessful: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccessful: false,
            err: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productModel.findById(id);
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                err: "Product not found",
            });
        }
        res.status(200).json({
            isSuccessful: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccessful: false,
            err: error.message,
        });
    }
});

// PUT update product
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                err: "Product not found",
            });
        }
        res.status(200).json({
            isSuccessful: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccessful: false,
            err: error.message,
        });
    }
});

// DELETE product
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                err: "Product not found",
            });
        }
        res.status(200).json({
            isSuccessful: true,
            data: "Product successfully deleted.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccessful: false,
            err: error.message,
        });
    }
});

// POST new product
router.post("/add-products", async (req, res) => {
    try {
        const requiredKeys = ["description", "price", "name"];
        const body = req.body;
        const missingFields = requiredKeys.filter(key => !body[key]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                isSuccessful: false,
                err: "Some required fields are missing.",
                required: missingFields,
            });
        }

        const obj = {
            description: body.description,
            price: body.price,
            name: body.name,
        };

        const modelObj = new productModel(obj);
        const savedProduct = await modelObj.save();
        res.status(201).json({
            isSuccessful: true,
            data: savedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccessful: false,
            err: error.message,
        });
    }
});

module.exports = router;
