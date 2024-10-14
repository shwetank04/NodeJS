const express = require('express');
const requestRouter = express.Router();
const {tokenAuth} = require('../middleware/auth');


requestRouter.post("/sendConnectionRequest",tokenAuth, (req,res) => {
    res.send("Connection request send");
});

module.exports = requestRouter;
