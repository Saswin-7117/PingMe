const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
.then(()=>{
    console.log("Connection Established");
    app.listen(7777,()=>{
    console.log("Server listening on port 7777")})
})
.catch((err)=>{
    console.error("Database connection has some problem: ", err.message);
})

