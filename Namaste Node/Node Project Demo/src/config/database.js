const mongoose = require('mongoose');
const connectDb = async() =>{
    await mongoose.connect("mongodb+srv://shwetanksudhanshu:kSUwBzDRxBOXbe6g@cluster0.duq475d.mongodb.net/")
};

module.exports = connectDb
