//importing modules 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//connectiong to mongo and making a database named personData
mongoose.connect('mongodb://localhost/personData',{useNewUrlParser:true});

const app = express();
const port = 80;  

//making schema of my data to store it in my database
var dataSchema = new mongoose.Schema({ 
    name: String,
    phone: String,
    email: String,
    address: String,
    dob: String,
    gender: String,
    concern: String
});

//moddeling my schema
var data = mongoose.model('data',dataSchema);

//to use static files from a directory satic
app.use("/static",express.static('static'));   

app.use(express.urlencoded({extended:true}));

//declaring endpoints for get requests
app.get('/',(req,res)=>{
    res.status(200).sendFile('index.html',{root:path.join(__dirname,'views')});
});
app.get('/form',(req,res)=>{
    res.status(200).sendFile('form.html',{root:path.join(__dirname,'views')});
});
//declaring end points for post request
app.post('/form',(req,res)=>{
    var myData = new data(req.body);
    myData.save().then(()=>{
        res.send("<h1>Your form has been submitted</h1>");   //sending response with status code 200 if there is no error
    }).catch(()=>{   //sending response with status code 400 if there is an error
        res.status(400).send("<h1>Your form has not been submitted</h1>");
    });
});

//starting our server at localhost and port 80
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

