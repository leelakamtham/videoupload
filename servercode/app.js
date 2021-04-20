

const express = require('express');
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir : './upload/'})


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));





const PORT = 3000;

/*
app.get('/api/upload', (req, res)=>{
    res.json({'message':'hello'});
});
*/

app.post('/api/upload', multipartMiddleware, (req, res)=>{
    console.log(req.files);
    
   // res.json({'message':req.files});

    res.json({'message':"video uploaded successfully"});
});


app.get("/api",(req,res)=>{
    res.send(req.filename.path);
});














app.listen(PORT,(req,res)=>{
    console.log(`server listening on port ${PORT}` )
})




  //, "proxyConfig": "proxy.conf.json"