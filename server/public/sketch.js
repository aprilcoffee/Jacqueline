var socket;
var inputX,inputY,inputZ;
var num;
var group;
var ip;
var run;
var flag = 0;
var img = [];
function setup() {
 createCanvas(windowWidth,windowHeight);
 background(0);
 num = 0;
 group = 0;
    flag = 0;
 ip = '';
 run = false;
 for(var s=100;s<=130;s++){
    img[s-100] = loadImage('img/'+str(s)+'.jpg');
 }
 //socket = io.connect('192.168.4.3:9527');
 socket = io.connect('192.168.2.115:9527');
 socket.on('newText',newDrawing);
 socket.on('assignNumber',assignNumber);
 textAlign(CENTER);
 textSize(50);
    inputX = 0;
    inputY = 0;
    frameRate(10);
}
function assignNumber(data){
    num = int(data.total);
    ip = data.ip.slice(7); 
    group = num%4;
}
function newDrawing(data){
    if(run == false){
    inputX = data.x;
    inputY = data.y;
    inputZ = data.z;
    }
    console.log(inputX,inputY,inputZ);
}

function draw() {
     if(inputX ==0 || inputX == num || -(inputX+1)==group){
        if(inputY == 9 ){
            
        }else{
            background(0);
        }
     }
    textSize(80);
    textAlign(CENTER);
    fill(255);
    text(num,width/2,height/2-80);
    textSize(30);
    text(ip,width/2,height/2);
    stroke(255);
    //text(frameRate(),100,100);
    line(width/2-30,height/2-60,width/2+30,height/2-60);

    if(inputX ==0 || inputX == num || -(inputX+1)==group){
        switch(inputY){
            case 0:
                break;
            case 1:
                shake();
                break;
            case 2:
                pureWhite();
                break;
            case 3:
                expand();
                break;
            case 4:
                shrink();
                break;
            case 5:
                someBlue();
                break;
            case 6:
                someRed();
                break;
            case 7:
                verticle();
                break;
            case 8:
                horizon();
                break;
            case 9:
                glitch();
                break;
    }}
}
function shake(){
    if(random(3)>2){    
        background(255);
    }
}
function pureWhite(){
    background(255);
    flag += 30;
    rectMode(CENTER);
    fill(map(flag,0,100,0,255));
    noStroke();
    rect(width/2,height/2,width,height);
    if(flag < 100){
        run = true;
    }else{
        inputY = 0;
        run =false;
        flag = 0;
    }
}
function expand(){
    flag += 30;
    rectMode(CENTER);
    fill(255);
    rect(width/2,height/2,width,map(flag,0,100,0,height));


    if(flag <100){
        run=true;
    }
    else {
        inputY = 0;
        run = false;
        flag=0;
    }
}
function shrink(){
    flag += 15;
    rectMode(CENTER);
    fill(255);
    rect(width/2,height/2,width,map(flag,0,100,height,0));
    if(flag<100){
        run = true;
    }else{
        inputY = 0;
        run = false;
        flag = 0;
    }

}
function someBlue(){
    if(inputZ == group){
        background(0,0,255);
    }else{
        shrink();
    }

}
function someRed(){
    if(inputZ == group){
        background(255,0,0);
    }
    else{
        expand();
    }
}
function verticle(){
    var strNum = floor(random(10));
    console.log(strNum);
    for(var s=0;s<10;s++){
        if(random(strNum)>3){
            fill(255);
            rectMode(CORNER);
            rect(s*(width/10),0,width/10,height);
        }
    }

}
function horizon(){
    var strNum = floor(random(18));
    for(var s=0;s<18;s++){
        if(random(strNum)>5){
            fill(255);
            rectMode(CORNER);
            rect(0,s*(height/18),width,(height/18));
        }
    }

}
function glitch(){
    var showImg = floor(random(30));
    image(img[showImg],0,0,width,height);
}
