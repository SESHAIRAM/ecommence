const { json } = require("express");
const accessModel = require("../models/AccessModel");

exports.LoginPage = async (req, res, next) => {
    const checkUserDetailsParse = req.body;// to check the Email already registor or not
    try {
        const existingUser = await accessModel.findOne({ mailID: checkUserDetailsParse.mailID });
        console.log(existingUser);

        if (existingUser !== null) {
            if (existingUser.password === checkUserDetailsParse.password) {
                res.json({
                    success: true,
                    errormsg: "user validate successfully",
                })
            } else {
                res.json({
                    success: false,
                    errormsg: "Incorrect password",
                })
            }

        } else {
            res.json(
                {
                    success: false,
                    errormsg: "user not exist",
                }
            )
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Something went wrong.',
            error: error.message
        });
    }
}