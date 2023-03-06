const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://shwetanksudhanshu:7YOOwxY185NqJD4A@cluster0.duq475d.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback();
    })
    .catch((e) => console.log(e));
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No db Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
