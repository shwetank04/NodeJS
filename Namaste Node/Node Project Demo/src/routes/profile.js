const express = require('express');
const profileRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');

profileRouter.get("/profile",tokenAuth,async (req,res) => {
    try{
        res.status(200).send(req.user ? req.user : "User not found");
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = profileRouter;
