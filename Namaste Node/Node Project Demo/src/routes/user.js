const express = require('express');
const userRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

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

//Information on who has accepted the request and who all are my connections. Connections can be either sender or receiver.
userRouter.get('/user/connections',tokenAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest  = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId",["firstName"]).populate("toUserId",["firstName"]);
        res.json({data: connectionRequest});
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

userRouter.get("/user/feed",tokenAuth, async(req,res) =>{
    try{
        //The user should see all the cards but avoid certain cards except his own card, his connections, ignored profile
        //already sent connection request to.
        const pageNo = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const loggedInUser = req.user;
        //Find all the connection request which i have sent or received.
        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        console.log(hideUserFromFeed);

        const users = await User.find({
            $and: [
               { _id: { $nin: Array.from(hideUserFromFeed) } },
               { _id: { $ne : loggedInUser._id} },
            ],
        }).skip((pageNo -1 * limit)).limit(limit);

        res.send(users);
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

module.exports = userRouter;
