const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password } = req.body;
    try{
        if(!firstName || !lastName) {
            throw new Error("Name is not valid");
        }
        if(firstName.length < 4 || firstName.length >50){
            throw new Error("Wrong length for firstName. It should be between 4 to 50 characters");
        }
        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }
        if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password");
        }
    }
    catch(e){
        throw Error(e);
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    if(!isEditAllowed){
        throw new Error("Validation Failed");
    }
}

module.exports = {validateSignUpData,validateProfileEditData};
