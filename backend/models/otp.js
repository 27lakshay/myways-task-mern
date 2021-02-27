const mongoose = require("mongoose");

const Otp = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            max: 255,
            min: 3,
        },
        otp: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("otp", Otp);
