var socket;
function setup() {
    createCanvas(windowWidth, windowHeight);
    setupOsc(12000, 3334);
    frameRate(30);
}
function greetA() {
  var data = {
    x: 255
  }
  socket.emit('data', data);
}
function greetB() {
  var data = {
    x: 255
  }
  socket.emit('data', data);
}


function triggerBeat() {
  console.log("hello");
  var data = {
  }
  socket.emit('data', data);
}


function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	var x,y;
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}

        var data = {
            x : x,
            y : y
        }
        socket.emit('data',data);
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('127.0.0.1:9527', { port: 9527, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}

function draw() {
    background(255);
}
