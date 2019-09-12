var socket;
var inputX,inputY;
function setup() {
 createCanvas(windowWidth,windowHeight);
 background(0);

 socket = io.connect('192.168.2.115:9527');
 socket.on('newText',newDrawing);
 textAlign(CENTER);
 textSize(50);
    inputX = 0;
    inputY = 0;
}
function newDrawing(data){
    inputX = data.x;
    inputY = data.y;
    console.log(inputX,inputY);
}

function draw() {
     background(0);
     ellipse(width/2,height/2,inputX,inputX);
}
