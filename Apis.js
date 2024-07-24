const express =  require('express');
const mongoose = require('mongoose');
const collection = require('./mongodb');
const cors = require('cors');
const multer = require("multer");
const path = require('path')
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
     destination: (req, file, cb) =>{
          cb(null, "images");
     },
     filename:(req,file,cb)=>{
          console.log(file)
          cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
     }
})

const upload = multer({storage: storage})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//convert data into json format
app.use(express.json());

app.use(cors({
     origin: 'http://localhost:4200'
   }));

app.use(function(req, res, next) {
    
     res.header('Access-Control-Expose-Headers','x-access-token, x-refresh-token')
     next();
   });

app.use(express.urlencoded({extended: false}))

app.get('/api', async (req, res) =>{
     let data =   await collection;
     data = await data.find();
     console.log(data)
     res.send(data);

},error =>{
     console.log(error)
})

app.get('/api/:id', async (req, res)=>{
     let data = await collection;
     data = await data.findOne({_id : req.params.id})
     res.send(data)
})

// Post data
app.post('/api', upload.single('logo'), async (req,res)=>{
     console.log("req.file", req.file)
     const data = {
          logo: req.file ? req.file.path : null,
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
     res.send(listData)
 })


app.delete('/api', async (req, res) =>{
     const data = await collection;
     const { ids } = req.body; // Expecting an array of IDs in the request body
     const result = await data.deleteMany({ _id: { $in: ids } });
     res.status(200).json({ message: 'Records deleted successfully', deletedCount: result.deletedCount });
})

const port = 5000;

app.listen(port, ()=>{
     console.log(`server running on port: ${port}`)
})