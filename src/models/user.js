const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 4,
        maxLength: 30
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required: true,
        lowercase:true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:90,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("Gender data is not valid")
            }
        }
    },
    photourl:{
        type:String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if (!validator.isURL(value)) {
            throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
},{
    timestamps:true
})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},process.env.JWT_TOKEN,{expiresIn: "1h"});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputbyUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputbyUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);

module.exports = {User};