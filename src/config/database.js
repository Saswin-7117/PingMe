const mongoose = require("mongoose");

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://root:root@cluster0.ytmpxyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
};

module.exports = {connectDB};