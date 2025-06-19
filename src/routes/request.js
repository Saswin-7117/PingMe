const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    res.send("Connection request Sent");
})

module.exports = {requestRouter};