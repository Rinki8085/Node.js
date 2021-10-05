const express = require('express');
const app = express();
const bodyParser = require('body-Parser');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT||8210;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// to receive data from form
app.use(bodyParser.urlencoded({extended:true})) 
app.use(bodyParser.json());
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://document:rk123456@cluster0.gfit3.mongodb.net/eduaug?retryWrites=true&w=majority";
var db;
//get
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
app.get('/restaurant',(req,res) =>{
    db.collection("restaurant").find().toArray((err,result)=>{
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
    db.collection('restaurant').find(query).toArray((err,result)=>{
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
    db.collection('restaurant').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//restaurants Details
app.get('/details/:id',(req,res) => {
    var id = req.params.id
    db.collection('restaurant').find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
    /*
    db.collection('restaurents').findOne({_id:id},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
    */
})

//place order by
app.post('/placeOrder',(req,res)=>{
    console.log(req.body)
    db.collection('order').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order Placed")
    })
})

//restaurants Details
app.get('/viewOrder',(req,res) => {
    var query = {}
    if(req.query.email){
        query = {email: req.query.email}
    }
    db.collection('order').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/viewOrder/:id',(req,res) => {
    var email = req.query.email;
    db.collection('order').find({email:email}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.delete('/deleteOrder',(req,res) => {
    db.collection('order').remove({},(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updateStatus/:id',(req,res) => {
    var id = mongo.ObjectId(req.params.id)
    var status = "pending";
    var statuVal = 2
    if(req.query.status){
        var statuVal = Number(req.query.status)
        if(statuVal == 1){
            status = 'Accepted'
        }else if(statuVal == 2){
            status = 'Rejected'
        }else{
            status = 'pending'
        }
    }
    db.collection('order').updateOne(
        {_id:id},
        {
            $set:{
                "status":status
            }
        },(err,result)=>{
            if(err) throw err;
            res.send(`Your Order status is ${status}`)
        }
    )
})

//List all QuickSearches
app.get('/quicksearch',(req,res) =>{
    db.collection("mealType").find().toArray((err,result)=>{
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