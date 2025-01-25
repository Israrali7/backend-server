const express = require("express")
const userSchema = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const usermodel = require("../models/usermodel");
// const AuthController = require('../controller/AuthController')

const router = express.Router();

router.get("/token", async (req, res) => {
  try {
    let token = req.headers.authorization;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        isSuccess: false,
        message: "No token provided",
      });
    }

    // Remove "Bearer " prefix from the token if present
    token = token.split(" ")[1];

    // Verify the token
    jwt.verify(token, "qwerty123456", async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          isSuccess: false,
          message: "Invalid token",
        });
      }

      // Token is valid; fetch the data
      const result = await usermodel.find({});
      return res.status(200).json({
        isSuccess: true,
        data: result,
      });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
});

router.post("/signUp", async (req, res) => {
    try {
        const body = req.body

        if (!body.email) {
            res.status(400).json({
                isSuccefull: false,
                error: "Email is Missing",
            })
        }
        if (!body.password) {
            res.status(400).json({
                isSuccefull: false,
                error: "password is Missing",
            })
        }

        const existingUser = await userSchema.findOne({ email: body.email })
        if (existingUser) {
            res.status(400).json({
                isSuccefull: false,
                error: "User With this Email Already exist",
            })
        } else {
            const hashedPassword = await bcrypt.hash(body.password, 10)

            const obj = {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            }
            const Modelobj = new userSchema(obj)
            Modelobj.save()
                .then(() => {
                    res.status(201).json({
                        isSuccefull: true,
                        message: "User Created Successfully"
                    })
                })
                .catch((err) => {
                    throw err
                })
        }
    }
    catch (error) {
        res.status(500).json({
            isSuccefull: false,
            message: error.message,
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const body = req.body
        if (!body.email) {
            res.status(400).json({
                isSuccefull: false,
                err: "Email is missing"
            })
        }
        if (!body.password) {
            res.status(400).json({
                isSuccefull: false,
                err: "password is missing"
            })
        }

        const existingUser = await userSchema.findOne({ email: body.email })
        if (existingUser) {
            passwordMatch = await bcrypt.compare(body.password, existingUser.password)
            if (passwordMatch) {
                const token = jwt.sign({ ...existingUser }, "qwerty123456", { expiresIn: "2min" })

                res.status(200).json({
                    isSuccefull: true,
                    message: "User Login SuccessFully",
                    data: {
                        user: existingUser,
                        token: token,
                    },
                })

            } else {
                res.status(400).json({
                    isSuccefull: false,
                    err: "PassWord Not matched",

                })
            }
        } else {
            res.status(404).json({
                isSuccefull: false,
                err: "User Not found with This Email"
            })
        }

    }
    catch (error) {
        res.status(500).json({
            isSuccefull: false,
            message: error.message,
        })
    }
})

module.exports = router;

// route.post("/login", AuthController.login);
// route.post("/signUp", AuthController.signUp);