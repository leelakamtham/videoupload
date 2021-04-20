

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir : './upload/'})

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));





const ffmpeg = require('fluent-ffmpeg');
const Promise = require("bluebird");


//const videoFile = "./Video.mp4";



/*


ffmpeg.ffprobe(videoFile,(err,metaData)=>{
    const {duration} = metaData.format;
    const clipDuration = 3;
    var arr = []
    for(var i=1; i < duration; i +=3){
        arr.push(i);
    }
    Promise.each(arr, function(a, index, length){
    var output = "./Out/demo"+index+".mp4"
    return split(a, clipDuration, videoFile, output).then(function(d){
        return
    })
      
    })
}) ;
*/
function split(startingTime, clipDuration, input, output){
    return new Promise(function(resolve, reject){
    console.log(startingTime, clipDuration)
    console.log(input, output)
    ffmpeg()
    .input(input)
    .inputOptions([ `-ss ${startingTime}`])
    .outputOptions([`-t ${clipDuration}`])
    
    .output(output)
    .on('end',() =>{ console.log("Done"); resolve({})})
    .on('error',(err) => {console.log(err);resolve({})})
    .run();
    });

    
}






app.post('/api/upload', multipartMiddleware, (req, res)=>{
    console.log(req.files);
    
   // res.json({'message':req.files});
const videofile = req.files.filename.path;
const file = req.files.filename.name;
//const extension = file.split('.');
const exten = path.extname(file);
const basename = path.basename(file,exten);





ffmpeg.ffprobe(videofile,(err,metaData)=>{
    const {duration} = metaData.format;
    const clipDuration = 3;
    var arr = []
    for(var i=1; i < duration; i +=3){
        arr.push(i);
    }
    Promise.each(arr, function(a, index, length){
    var output = "./splitedfol/"+basename+index+exten;
    return split(a, clipDuration, videofile, output).then(function(d){
        return
    })
      
    })
}) ;

    res.json({'message':"video uploaded successfully"});
});


app.get("/api/getfiles",(req,res)=>{
    const files= fs.readdirSync(__dirname+ '/splitedfol/');

    console.log(files);
    res.send(files);


    //res.send("welcome to my project");
});


app.get('/api/download/:filename',(req,res)=>{

      
var file = fs.readFileSync(__dirname + '/splitedfol/'+req.params.filename, 'binary'); 
res.setHeader('Content-Length', file.length); 
res.write(file,'binary');  
  res.end();




});
















app.listen(PORT,(req,res)=>{
    console.log(`server listening on port ${PORT}` )
})




  //, "proxyConfig": "proxy.conf.json"