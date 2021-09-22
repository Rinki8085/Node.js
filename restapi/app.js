const express = require('express');
const app = express();
const port = 8200;

var employee = [ {
    "id": "98287",
    "fname": "John",
    "lname": "Michale"
  },
  {
    "id": "542",
    "fname": "John",
    "lname": "Michale"
  },
  {
    "id": "56666",
    "fname": "John",
    "lname": "sharma"
  },
  {
    "id": "29162",
    "fname": "John",
    "lname": "sharma"
  }]

//get
app.get('/', (req, res) => {
    res.send("Welcome to Api2")
})

//employee
app.get('/employee', (req, res) => {
    res.send(employee)
})

app.listen(port,() =>{
    console.log(`listenining port number ${port}`)
})