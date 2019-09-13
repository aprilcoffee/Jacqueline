var socket;
var inputX,inputY;
var num;
var ip;
function setup() {
 createCanvas(windowWidth,windowHeight);
 background(0);
 num = 0;
 ip = '';
 socket = io.connect('192.168.4.3:9527');
 socket.on('newText',newDrawing);
 socket.on('assignNumber',assignNumber);
 textAlign(CENTER);
 textSize(50);
    inputX = 0;
    inputY = 0;
}
function assignNumber(data){
    num = int(data.total);
    ip = data.ip.slice(7); 
}
function newDrawing(data){
    inputX = data.x;
    inputY = data.y;
    console.log(inputX,inputY);
}

function draw() {
    background(0);
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text(num,width/2,height/2-50);
    textSize(20);
    text(ip,width/2,height/2+50);
     if(inputY == num){
     ellipse(width/2,height/2,inputX,inputX);
     }else if(inputY==-1){
    ellipse(width/2,height/2,inputX,inputX);
     }
}
