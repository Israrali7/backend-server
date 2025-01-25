const express = require("express");
const BookModel = require("../models/bookmodel");
const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
    try {
        const result = await BookModel.find({});
        res.status(200).json({
            isSuccessful: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});

// Get a book by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await BookModel.findById(id);
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            isSuccessful: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});

// delete 
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await BookModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            isSuccessful: "book deleted successfully",
            data: "empty",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});

// Add a new book
router.post("/", (req, res) => {
    try {
        const requiredKeys = ["title", "description", "author", "noOfPages"]

        const body = req.body
        let arr = []
        requiredKeys.forEach(x => {
            if (!body[x]) {
                arr.push(`required ${x}`)
            }
        })
        if (arr.length > 0) {
            res.status(400).json({
                isSuccessful: false,
                err: "invalid Input Field",
                required : arr,
            })
        }
        const obj = {
            title: body.title,
            description: body.description,
            author: body.author,
            noOfPages: body.noOfPages,
        }
        const modelObj = new BookModel(obj)
        modelObj.save()
            .then(() => {
                res.status(201).json({
                    isSuccefull: true,
                    error: "Product Created Successfully",
                    message:modelObj,
                })
            })
    }
    catch (error) {
        res.status(500).json({
            isSuccessful: false,
            err: "There is an Err",
            message: error.message,
        })
    }
});

// Update a book
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const result = await BookModel.findByIdAndUpdate(id, body, { new: true });
        if (!result) {
            return res.status(404).json({
                isSuccessful: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            isSuccessful: true,
            message: "Book updated successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});

module.exports = router;
