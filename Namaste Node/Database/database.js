//Go to mongodb website
//create a free MB Cluster
//Create a User
//Get the connection string
//Install Mongo DB Compas

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://shwetanksudhanshu:shwetank12345@cluster0.duq475d.mongodb.net/";

const client = new MongoClient(url);
const dbName = 'HelloWorld';

async function main() {
    //Use connect method to connect to server
    await client.connect();
    console.log("Connected Successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('User');

    //Insert
    const user = {
        "firstname": "Solo",
        "lastname": "Leveling",
        "city": "Osaka",
        "phonenumber": "78945612"
    }

    collection.insertOne(user);
    
    //Read
    const findResult = await collection.find({}).toArray();
    console.log("Found Document ",findResult);
    return "done";
}

main().then(console.log).catch(console.error).finally(() => client.close());
