const express = require('express');
const {adminAuth} = require('./middleware/auth')
const {userAuth} = require('./middleware/userAuth')
const app = express();

//MiddleWare which only works for api starting with /admin
app.use('/admin',adminAuth);

//Instead of repeating the logic for authentication as well checking if its an admin as below, we can use middleware
app.get('/admin/getAllData', (req,res) => {
    //First check if its authenticated
    // const token = 'yz'
    // const isAdminAuthorized = token === 'xyz'
    // if(isAdminAuthorized){
    //     res.send(200);
    // }
    // else{
    //     res.status(401).send("Not valid")
    // }
    //Then check if its a admin
    //Logic of fetching all data
    res.send("Data sent SucessFully");
})

app.get('/admin/deleteUser', (req,res) => {
    //First check if its authenticated
    //Then check if its a admin
    //Logic of fetching all data
    res.send("Delete")
})

//we can write middleware like this as well
app.get('/user/getDetais',userAuth,(req,res)=>{
    res.send("Data sent SucessFully for User");
})

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
