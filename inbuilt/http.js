var http = require('http');

//req > what we send to the server
//res > what server respond

var server = http.createServer(function(req, res){
    res.write('<h1>Api with Node JS</h1>')
    res.end()
})

server.listen(6700)