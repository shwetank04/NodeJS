const express = require('express');
const app = express();


app.get("/getUserData",(req,res)=>{
    try{
        throw new Error("Error");
        res.send("User data sent")   
    }
    catch(err){
        res.status(500).send("Some error occured")
    }
})

//Here the err should be the first parameter and should be at the end so that if any error occurs at top can come here
app.use("/",(err,req,res,next)=> {
    if(err){
        console.error(err.message);
        res.status(500).send("Something went wrong");
    }
})

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
