const mongoose = require("mongoose");

const Users = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            unique: false,
            max: 255,
            min: 3,
        },
        last_name: {
            type: String,
            required: true,
            unique: false,
            max: 255,
            min: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 255,
            min: 3,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            min: 3,
        },
        // isVerified: {
        //     type: Boolean,
        //     default: false,
        // }
    },
    { timestamps: true }
);
module.exports = mongoose.model("users", Users);
