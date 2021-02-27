const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.Port || 5000;

//import routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

//middleware
app.use(cors());    
app.use(express.json());

//route middlewares
app.use("/api", authRoute);
app.use("/api/profile", profileRoute);
// app.use("/api/attendance", attendanceRoute);

//connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

//start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
});
