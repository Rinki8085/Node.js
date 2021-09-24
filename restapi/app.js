const express = require('express');
const app = express();
const port = 8200;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient();
const mongourl = "mongodb://localhost:27017"
let db;
let coll_name ="category";

//get
app.get('/', (req, res) => {
    res.send("Welcome to Api2")
})

//employee
app.get('/category', (req, res) => {
    db.collection(coll_name).find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    })
})

MongoClient.connect(mongourl,(err,client) =>{
  if(err) console.log("Error While Connecting");
  db = client.db("document");
  app.listen(port,()=>{
    console.log(`listening on port no ${port}`);
  });
})

app.listen(port,() =>{
    console.log(`listenining port number ${port}`)
})