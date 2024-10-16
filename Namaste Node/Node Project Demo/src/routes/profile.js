const express = require('express');
const profileRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');
const {validateProfileEditData} = require('../utils/validation');

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

module.exports = profileRouter;
