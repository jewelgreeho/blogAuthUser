const User = require("../models/user");
const catchAsynErrors = require("../middlewares/catchAsynErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const crypto = require('crypto');


//Registation User => /api/v1/register
exports.registerUser = catchAsynErrors(async(req, res, next) => {

    const { first_name, last_name, email, password, gender, dob } = req.body;

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        gender,
        dob
    });

    sendToken(user, 200, res)
})



//Login User => /api/v1/login
exports.loginUser = catchAsynErrors(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    console.log(user)

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)

})


