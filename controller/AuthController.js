const Jwt = require('jsonwebtoken');
const { sendResponse } = require('../config/helpers');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

const AuthController = {
    login: async (req, res) => {
        try {
            const body = req.body;
            if (!body.email) {
                return res.status(404).json(sendResponse(false, "Email is Missing"));
            }
            if (!body.password) {
                return res.status(404).json(sendResponse(false, "Password is Missing"));
            }

            const existing = await usermodel.findOne({ email: body.email });
            if (!existing) {
                return res.status(404).json(sendResponse(false, "User with this email not found"));
            }

            const isMatched = await bcrypt.compare(body.password, existing.password);
            if (!isMatched) {
                return res.status(400).json(sendResponse(false, "Wrong Password"));
            } else {
                const token = Jwt.sign({ ...existing._doc }, "abcdefgh123456789", {
                    expiresIn: "3min",
                });

                return res.status(200).json(
                    sendResponse(true, "Logged In Successfully", {
                        user: existing,
                        token: token,
                    })
                );
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(sendResponse(false, "Internal Server Error", error.message));
        }
    },

    signUp: async (req, res) => {
        try {
            const body = req.body;
            if (!body.email) {
                return res.status(400).json(sendResponse(false, "Email is Missing"));
            }
            if (!body.password) {
                return res.status(400).json(sendResponse(false, "Password is Missing"));
            }

            const existingUser = await usermodel.findOne({ email: body.email });
            if (existingUser) {
                return res.status(400).json(sendResponse(false, "User Already Exists with this Email"));
            } else {
                const hashedPassword = await bcrypt.hash(body.password, 10);
                const obj = {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                };
                const newUser = new usermodel(obj);
                newUser.save()
                    .then(() => {
                        return res.status(201).json(sendResponse(true, "User Created Successfully"));
                    })
                    .catch((err) => {
                        console.error(err);
                        throw err;
                    });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json(sendResponse(false, "Internal Server Error", error.message));
        }
    },
};

module.exports = AuthController;
