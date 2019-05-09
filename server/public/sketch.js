var socket;
var input;
function setup() {
 createCanvas(windowWidth,windowHeight);
 background(0);

 socket = io.connect('http://www.liutingchun-netart.com:9527');
 socket.on('newText',newDrawing);
 textAlign(CENTER);
 textSize(50);
    input = 0;
}
function newDrawing(data){
    input = data.x;
    console.log(input);
}

function draw() {
 background(input);
    input *= 0.93;
}
