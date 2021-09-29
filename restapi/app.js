const express = require('express');
const app = express();
const port = process.env.PORT||8000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://document:rk123456@cluster0.gfit3.mongodb.net/eduaug?retryWrites=true&w=majority";
var db ;
app.get('/',(req,res) => {
  res.send("Welcome to Node Api2")
})

//List All cities
app.get('/location',(req,res) =>{
  db.collection('location').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

//List all restaurants
app.get('/restaurants',(req,res) =>{
  db.collection('restaurents').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

//List restaurants wrt to city
// params example
/*app.get('/restaurant/:cityId',(req,res) =>{
  var cityId = req.params.cityId;
  db.collection('restaurents').find({city:cityId}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})*/

// query example
app.get('/restaurant',(req,res) =>{
  var query = {}
  if(req.query.cityId){
      query={city:req.query.cityId}
  }else if(req.query.mealtype){
      query={"type.mealtype":req.query.mealtype}
  }
  db.collection('restaurents').find(query).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

//filterapi
//(http://localhost:8210/filter/1?lcost=500&hcost=600)
app.get('/filter/:mealType',(req,res) => {
  var mealType = req.params.mealType;
  var query = {"type.mealtype":mealType};
  if(req.query.cuisine && req.query.lcost && req.query.hcost){
      query={
          $and:[{cost:{$gt:Number(req.query.lcost),$lt:Number(req.query.hcost)}}],
          "Cuisine.cuisine":req.query.cuisine,
          "type.mealtype":mealType
      }
  }
  else if(req.query.cuisine){
      query = {"type.mealtype":mealType,"Cuisine.cuisine":req.query.cuisine }
  }
  else if(req.query.lcost && req.query.hcost){
      var lcost = Number(req.query.lcost);
      var hcost = Number(req.query.hcost);
      query={$and:[{cost:{$gt:lcost,$lt:hcost}}],"type.mealtype":mealType}
  }
  db.collection('restaurents').find(query).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

//List all QuickSearches
app.get('/quicksearch',(req,res) =>{
  db.collection('mealType').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
  })
})

MongoClient.connect(mongourl, (err,client) => {
  if(err) console.log("Error While Connecting");
  db = client.db('eduaug');
  app.listen(port,()=>{
      console.log(`listening on port no ${port}`)
  });
})
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