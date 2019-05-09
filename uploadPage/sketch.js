var socket;
var mic, fft;
var ellipseWidth;
var buttonA;
var buttonB;
function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://34.80.211.90:9527');
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  peakDetect = new p5.PeakDetect(20,20000,0.15,20);
  frameRate(30);

  button = createButton('preload');
  button.position(100,65);
  button.mousePressed(greetA);

  button = createButton('start');
  button.position(200,65);
  button.mousePressed(greetB);
  ellipseWidth = 255;
}

function greetA() {
  var data = {
    x: -1
  }
  socket.emit('data', data);
}
function greetB() {
  var data = {
    x: -2
  }
  socket.emit('data', data);
}


function triggerBeat() {
  ellipseWidth = 255;
  console.log("hello");

  var data = {
    x: ellipseWidth
  }
  socket.emit('data', data);
}

function draw() {
  background(255);
  //peakDetect.onPeak(triggerBeat);
  var spectrum = fft.analyze();
  fft.analyze();
  peakDetect.update(fft);
  //peakDetect.onPeak(triggerBeat);
    //
  if(peakDetect.isDetected){
      console.log("hello");
        triggerBeat();
  }
  // beginShape();
  // for (i = 0; i < spectrum.length; i++) {
  //   vertex(i, map(spectrum[i], 0, 255, height, 0));
  // }
  // endShape();

  //micLevel = mic.getLevel();
  //ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
  //console.log(ellipseWidth);
  ellipseWidth *= 0.95;
  ellipse(width / 2, height / 2, ellipseWidth, ellipseWidth);
}
