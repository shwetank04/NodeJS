const mongoose = require('mongoose');
const validator = require('validator');


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
        maxLength:10,
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

const User = mongoose.model("User",userSchema);

module.exports = User;
