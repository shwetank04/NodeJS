const express = require('express');
const profileRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');
const {validateProfileEditData,validateProfilePasswordData} = require('../utils/validation');
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view",tokenAuth,async (req,res) => {
    try{
        res.status(200).send(req.user ? req.user : "User not found");
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

profileRouter.patch("/profile/edit",tokenAuth,async (req,res) => {
    try{
        validateProfileEditData(req);
        //Token auth has attached the user in req
        const user = req.user;
        Object.keys(req.body).forEach(key => user[key] = req.body[key]);
        await user.save();
        res.status(200).send("Updated Successfully");
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

profileRouter.patch("/profile/password",tokenAuth,async (req,res) => {
    try{
        const currentPassword = req.body.currentPassword;
        const user = req.user;
        const isPasswordValid = user.validatePassword(currentPassword);
        if(isPasswordValid) {
            const newPassword = await bcrypt.hash(req.body.newPassword,10);
            user.password = newPassword;
            await user.save();
            res.status(200).send("Password Updated Successfully");
        }
        else{
            throw new Error("Invalid current password")
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = profileRouter;
