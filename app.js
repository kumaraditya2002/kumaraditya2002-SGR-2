const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/personData',{useNewUrlParser:true});

const app = express();
const port = 80;

var dataSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dob: String,
    gender: String,
    concern: String
});

var data = mongoose.model('data',dataSchema);

app.use("/static",express.static('static'));   
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.status(200).sendFile('index.html',{root:path.join(__dirname,'views')});
});
app.get('/form',(req,res)=>{
    res.status(200).sendFile('form.html',{root:path.join(__dirname,'views')});
});
app.post('/form',(req,res)=>{
    var myData = new data(req.body);
    myData.save().then(()=>{
        res.send("<h1>Your form has been submitted</h1>");
    }).catch(()=>{
        res.status(400).send("<h1>Your form has not been submitted</h1>");
    });
});

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

