const express =  require('express');
const mongoose = require('mongoose');
const collection = require('./mongodb');


const app = express();

//convert data into json format
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/api', async (req, res) =>{
     let data =   await collection;
     data = await data.find();
     console.log(data)
     res.send(data);

     // data.find({}).then((list)=>{
     //      res.send(list)
     // })
},error =>{
     console.log(error)
})

app.get('/api/:id', async (req, res)=>{
     let data = await collection;
     data = await data.findOne({_id : req.params.id})
     res.send(data)
})

// Post data
app.post('/api', async (req,res)=>{

     const data = {
          companyName : req.body.companyName,
          socialMediaLogo: req.body.socialMediaLogo,
          description: req.body.description,
          faceBookURL: req.body.faceBookURL,
          linkedInURL: req.body.linkedInURL,
          twitterURL: req.body.twitterURL,
          instagramURL: req.body.instagramURL,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email
     }

     const listData = await  collection.insertMany(data);
     console.log(listData)

     // const db = await dbConnect();
     // const result = await db.insertOne(req.body);
     // res.send(result);

     // let listOfData = req.body.companyName;
     // let newdata = new data({
     //      listOfData
     // })
     // newdata.save().then((response) =>{
     //      res.send(response);
     // })
 })


app.delete('/api', async (req, res) =>{
     const data = await collection;
     const { ids } = req.body; // Expecting an array of IDs in the request body
     const result = await data.deleteMany({ _id: { $in: ids } });
     // res.send(result)
     res.status(200).json({ message: 'Records deleted successfully', deletedCount: result.deletedCount });
})

const port = 5000;

app.listen(port, ()=>{
     console.log(`server running on port: ${port}`)
})