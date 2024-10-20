const express = require('express');
const requestRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId",tokenAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error(status +" status type not allowed");

        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("Invalid user Id");
        }
        //Check if there is an existing ConnectionRequest, from one user to other and vice versa
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId: fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).send("Connection Request already exists");
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();

        res.json({
            message: "Connection Request Sent Successfully",
            data : data
        })
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

requestRouter.post("/request/review/:status/:requestId",tokenAuth, async(req,res) => {
    try{
        const status = req.params.status;
        const loggedInUser = req.user;
        const requestId = req.params.requestId;
        // Garp => Luffy, so luffy is on receiving end and he should be the logged in user to accept it which is toUserId
        //The status should be in interested state. Request Id should be valid.
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)) {
            throw new Error(status +"Status not allowed");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if(!connectionRequest){
            throw new Error("Connection Request not found");
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({message: "Connection request "+status, data});

    }
    catch(e){
        res.status(500).send(e.message);
    }
})

module.exports = requestRouter;
