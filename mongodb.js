// const {MongoClient} = require('mongodb');
// const url = "mongodb://0.0.0.0:27017/";

// const dataBase = 'scrapping';
// const client  = new MongoClient(url);

// async function dbConnect(){
//      let result = await client.connect();
//      let db = result.db(dataBase);
//      return  db.collection('webScrapping');
  
//  }
 
//  module.exports = dbConnect;

const mongoose  = require('mongoose');
const connect  = mongoose.connect("mongodb://0.0.0.0:27017/webScrapping");

connect.then(() =>{
     console.log('Database connected');
}).catch(()=>{
     console.log("Database not connected")
})

const listSchema = new mongoose.Schema({
     companyName:{
          type: String,
          require: true,
     },
     socialMediaLogo: {
          type: String,
     },
     description: {
          type: String,
          require: true
     },
     faceBookURL: {
          type: String
     },
     linkedInURL: {
          type: String
     },
     twitterURL: {
          type: String
     },
     instagramURL: {
          type: String
     },
     address: {
          type: String,
          require: true
     },
     phoneNumber: {
          type: Number,
          require: true
     },
     email: {
          type: String,
          require: true
     }
})

const collection = new mongoose.model("listOfData", listSchema);

module.exports = collection