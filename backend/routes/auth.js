const router = require("express").Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/token");
const Users = require("../models/user");
const Otp = require("../models/otp");
const { registerValidation, loginValidation } = require("./validation");

//desc:     signIn status
//access:   /private
//path:     /
router.get("/", auth, async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.currentUser }).select("-password");
        const { email } = user;
        res.json({
            email,
            status: "authenticated",
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//desc:     signIn
//access:   /public
//path:     /login
router.post("/login", async (req, res) => {
    try {
        // //validating the data before user submission
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).json({
                status: error.details[0].message,
            });
        }
        //checking email
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            //check password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass)
                return res.status(400).json({
                    status: "Incorrect password",
                });
        } else {
            return res.status(400).json({
                status: "Email does not exist",
            });
        }
        //create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "24h",
        });
        res.json({
            token,
            status: "authenticated",
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/register/", async (req, res) => {
    try {
        const emailExist = await Users.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                status: "Email already registered",
            });
        }
        const generateOtp = Math.floor(Math.random() * 100001);
        //create a new user
        const newVisitor = new Otp({
            email: req.body.email,
            otp: generateOtp,
        });
        await newVisitor.save();
        // Send email (use credentials of SendGrid)
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_PASSWORD },
        });
        var mailOptions = {
            from: "lakshyak983@gmail.com",
            to: req.body.email,
            subject: "OTP For new account verification",
            text: "OTP:  " + generateOtp,
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                return res.status(500).send({
                    msg: "Technical Issue!, Please click on resend for verify your Email.",
                });
            }
            return res.status(200).send("A verification email has been sent to " + req.body.email);
        });
        // res.json({
        //     reponse: {
        //         status: true,
        //     },
        // });
    } catch (err) {
        res.status(400).json(err);
    }
});
//desc:     signUp
//access:   /public
//path:     /register
router.post("/register/verify", async (req, res) => {
    //validate data before submission
    try {
        const emailExist = await Otp.findOne({ email: req.body.email });
        if (emailExist) {
            if (emailExist.otp === JSON.parse(req.body.otp)) {
                console.log("inside");
                //hash passwords before submission
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                //create a new user
                const newUser = new Users({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                await newUser.save();
                await Otp.findOneAndDelete({ email: req.body.email });
            } else {
                return res.status(400).json({
                    status: "Incorrect OTP",
                });
            }
        }
        res.json({
            reponse: {
                status: true,
            },
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

// //desc:     signUp
// //access:   /public
// //path:     /register
// router.post("/register/verify", async (req, res) => {
//     //validate data before submission
//     try {
//         const { error } = registerValidation(req.body);
//         if (error) {
//             return res.status(400).json({
//                 status: error.details[0].message,
//             });
//         }
//         const emailExist = await Otp.findOne({ email: req.body.email });
//         if (emailExist) {
//             return res.status(400).json({
//                 status: "Email already registered",
//             });
//         }
//         //hash passwords before submission
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         //create a new user
//         const newUser = new Users({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//         });
//         await newUser.save();
//         res.json({
//             reponse: {
//                 status: true,
//             },
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });
