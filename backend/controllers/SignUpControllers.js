const { json } = require("express");
const accessModel = require("../models/AccessModel");


exports.SignUpPage = async (req, res, next) => {
    const addUserDetailsParse = req.body;// to check the Email already registor or not
    try {
        const existingUser = await accessModel.findOne({ mailID: addUserDetailsParse.mailID });
        if (existingUser === null) {
            const registeringUser = await accessModel.insertMany(addUserDetailsParse);
            console.log(registeringUser);
            res.json(
                {
                    success: true,
                    name: registeringUser.userName,
                    errormsg: "successfully registed",
                }
            )
        } else {
            res.json(
                {
                    success: false,
                    errormsg: "user is already register",
                }
            )
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Something went wrong.',
            error: error.message // Optionally send the error message
        });
    }

}
