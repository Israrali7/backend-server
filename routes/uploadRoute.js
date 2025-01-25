const express = require('express')
const route = express.Router();
const cloudinary = require('../utils/SchemaCloundinary')
const upload = require('../middleware/multer')

route.post('/upload', upload.single('image'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, res) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                isSucessfull: false,
                message: "Error"

            })
        }
        res.status(200).json({
            isSucessfull: true,
            message: "Image successFully Uploaded",
            data : result,
        })
    })
})

module.exports = route;