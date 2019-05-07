var express = require('express');

var app = express();
var server = app.listen(9527);

app.use(express.static('public'));
console.log("Socket server is running");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

console.log("running");

function newConnection(socket){
    console.log('new connection: '+socket.id);
    socket.on('data',dataMsg);
    function dataMsg(data){
        console.log(data);
	socket.broadcast.emit('newText',data);
    }	
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
