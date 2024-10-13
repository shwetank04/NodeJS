const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength:4,
        maxLength:10
    },
    lastName:{
        type: String,        
        maxLength:10
    },
    emailId: {
        type: String,
        required : true,
        unique: true,
        lowercase:true,
        trim:true,
        minLength:4,
        maxLength:20,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Invalid email address");
           }
        }
    },
    password: {
        type: String,
        required : true,
        minLength:4,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("Enter strong password");
            }
         }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
             throw new Error("Invalid photo URL");
            }
         }
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills:{
        type: [String],
        validate(val){
            if (val.length > 10) {
                throw new Error('Cannot have more than 10 skills');
            }
        }
    }
},{
    //created at and updated at will be automatically added using this
    timestamps: true
})

//Dont use arrow function here as this keyword will only work with normal function.
//offloading logic to schema
userSchema.methods.getJWT = async function () {
    const user = this; // this is referencing to the instance when we are calling the getJWT method. (user.getJWT)
   const token = await jwt.sign({_id:user._id},"NODEPROJECT$790",{expiresIn : "1d"});
   return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);;
