var fs = require('fs');

//It will create and overwrite the content.
/*fs.writeFile('MyCode.txt',"My Code from NodeJS.",function(err){
    if(err) throw err;
    console.log('File is Created')
})*/

//It will create and append the file
/*fs.appendFile('MyText.txt',`${Math.floor(Math.random()*10000)}This is new line.\n`,(err) =>{
    if(err) throw err;
    console.log('Content Appendend')
})*/

/*
fs.readFile('db.json','utf-8',(err,data) =>{
    if(err) throw err;
    console.log(data);
})*/
/*
fs.rename('MyText.txt','Mytext.txt',(err) =>{
    if(err) throw err;
    console.log('File Rename')
})*/

fs.unlink('Mytext.txt',(err) =>{
    if(err) throw err;
    console.log('File Deleted')
})