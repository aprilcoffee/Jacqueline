var socket;
var input;
function setup() {
 createCanvas(windowWidth,windowHeight);
 background(0); 

 socket = io.connect('127.0.0.1:9527');
 socket.on('newText',newDrawing);
 textAlign(CENTER);
 textSize(50);
}
function newDrawing(data){
    input = data.x;
}

function draw() {
 background(100);
    fiLL(0);
 ellipse(width/2,height/2,50,50);
}
