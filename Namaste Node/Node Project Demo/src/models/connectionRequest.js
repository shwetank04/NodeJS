const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        //This is reference to user collection.Creating a link between two collections.
        ref: "User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type: String,
        required:true,
        enum: {
            values : ["ignore","interested","accepted","rejected"],
            message : `{VALUE} is incorrect status type`
        },
    },
},
    {timestamps:true}
)

//Compound Index. If we do ConnectionRequest.find({fromUserId:23q4400, toUserId:232424}), then it will be fast.
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

//This will be called everytime connection request is saved. i.e whenever we are saving a connection request
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    //check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("FromUserId cannot be same as toUserId");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;
