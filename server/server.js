var express = require('express');
var osc = require('node-osc');


var app = express();
var server = app.listen(9527);

app.use(express.static('public'));
console.log("Socket server is running");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

var isConnected = false;
console.log("running");
var totalConnection = 0;
function newConnection(socket){
    totalConnection = totalConnection+1;
    var init = {
        total: totalConnection,
        ip: socket.client.conn.remoteAddress
    }
    socket.emit("assignNumber",init);
    
    console.log(socket.client.conn.remoteAddress);
    //console.log(socket.client.conn.request.headers);
    //console.)
    console.log('new connection: '+socket.id+"   Number:"+totalConnection);
    socket.on('data',dataMsg);
    function dataMsg(data){
        console.log(data);
	socket.broadcast.emit('newText',data);
    }
    socket.on("config",function(obj){
        isConnected = true;
        oscServer = new osc.Server(obj.server.port, obj.server.host);
        oscClient = new osc.Client(obj.client.host, obj.client.port);
        oscClient.send('/status', socket.sessionId + ' connected');
        oscServer.on('message', function(msg, rinfo) {
	    socket.emit("message", msg);
	});
	socket.emit("connected", 1);
    });
    socket.on("message", function (obj) {
	oscClient.send.apply(oscClient, obj);
    });
    socket.on('disconnect', function(){
	if (isConnected) {
            //oscServer.kill();
	    //oscClient.kill();
	}
    });
}
