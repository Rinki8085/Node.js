const express = require('express');
const app = express();
const port = process.env.PORT||8000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://document:rk123456@cluster0.gfit3.mongodb.net/eduaug?retryWrites=true&w=majority";
var db ;

//get
app.get('/', (req, res) => {
    res.send("Welcome to Api4")
})

//location
app.get('/location', (req, res) => {
  db.collection("location").find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.get('/cuisine', (req, res) => {
  db.collection("cuisine").find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//query example
app.get('/restaurant',(req,res) =>{
  db.collection("restaurent").find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

app.get('/quicksearch',(req,res) =>{
  db.collection('mealType').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

app.get('/restaurent',(req,res) =>{
  var cityId = req.query.cityId?req.query.cityId:"2";
  db.collection('restaurent').find({city:cityId}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

app.get('/restaurent',(req,res) =>{
  var mealtype = req.query.mealType?req.query.mealType:"2";
  db.collection('restaurent').find({"type.mealType":mealType}).toArray((err,result)=>{
    if (err) throw err;
    res.send(result)
  })
})

app.get('/mealtype', (req, res) => {
  db.collection("mealtype").find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

MongoClient.connect(mongourl,(err,client) => {
  if(err) console.log("Error while connecting");
  db = client.db("eduaug");
  app.listen(port,() =>{
    console.log(`listening port number ${port}`)
  })
})