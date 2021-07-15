const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const https = require('https');
var cors = require('cors');
const fs = require('fs')
const app = express();
const category = {
"Cubesats": "cubesat.txt",
}

var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


io.on('connection', function(socket){
    console.log("connect socket from open-orbit frontend")
})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get("/", function(req, res, next) {
    return res.send('pong');
});

app.get("/api/listcategory", function(req,res) {
    fs.readFile(path.resolve(__dirname, "./TLEs/categories.json"), 'UTF-8', function (err, data){
        return res.send({categories: data})
    })
})

app.post("/api/updateTles", function(req, res) {
    var files = []
    for(var key in category){
        files.push(category[key])
 //       var filename = category[key]
 //       var file = fs.createWriteStream(filename);
 //       var request = https.get("https://www.celestrak.com/NORAD/elements/"+filename, function(response) {
 // response.pipe(file);
}
    try {
    processArray(files)
}
    catch(err) {
    return res.send({status: "fail"})
}
    return res.send({status: "success"})
    
    })


app.post("/api/getFile", function(req, res) {
    var key = req.body.fileName
    console.log(key)
    fs.readFile(path.resolve(__dirname, "./TLEs/"+key), 'UTF-8', function (err, data){
        return res.send({tle: data})
    })
})

async function processArray(array) {
    array.forEach(async (item) => {
    var filename = item
    console.log(path.join(__dirname, "./TLEs/" + filename))
    var file = fs.createWriteStream(path.join(__dirname, "./TLEs/" + filename));
    var request = https.get("https://www.celestrak.com/NORAD/elements/"+filename, function(response) {
    response.pipe(file);})
})
}


server.listen(process.env.PORT || 8080);