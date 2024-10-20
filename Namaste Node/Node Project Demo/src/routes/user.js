const express = require('express');
const userRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');

//Get all the pending connection request for logged in user
userRouter.get('/user/requests/received',tokenAuth, async(req,res) => {
    try{

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status: "interested"
    }).populate("fromUserId",["firstName","lastName"]); //The first name and last name will come from User table. 

        res.json({message: "Data fetched successfully ",
            data: connectionRequest,
        })
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

module.exports = userRouter;
