const mongoose = require('mongoose');
const connectDb = async() =>{
    await mongoose.connect("mongodb+srv://shwetanksudhanshu:****@cluster0.duq475d.mongodb.net/NodeProject")
};

module.exports = connectDb
