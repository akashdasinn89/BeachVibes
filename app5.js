var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var Email = req.body.Email;
    var Password =req.body.Password;
  
    var data = {
        "Email":Email,
        "Password":Password,
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('success.html');
})
  
  
app.get('/login',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('login.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");