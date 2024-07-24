const mongoose  = require('mongoose');
const connect  = mongoose.connect("mongodb://0.0.0.0:27017/webScrapping");

connect.then(() =>{
     console.log('Database connected');
}).catch(()=>{
     console.log("Database not connected")
})

const listSchema = new mongoose.Schema({
     logo:{
          type: String
     },
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