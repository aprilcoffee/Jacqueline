var socket;
var mic, fft;
var canvas;
var ellipseWidth;
var buttonA;
var buttonB;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  socket = io.connect('10.254.19.90:3000');
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  peakDetect = new p5.PeakDetect();
  frameRate(60);

  button = createButton('preload');
  button.position(100,65);
  button.mousePressed(greetA);

  button = createButton('start');
  button.position(200,65);
  button.mousePressed(greetB);
}

function greetA() {
  var data = {
    x: -1
  }
  socket.emit('mouse', data);
}
function greetB() {
  var data = {
    x: -2
  }
  socket.emit('mouse', data);
}


function triggerBeat() {
  ellipseWidth = 255;
  console.log("hello");

  var data = {
    x: ellipseWidth
  }
  socket.emit('mouse', data);
}

function draw() {
  background(255);
  peakDetect.onPeak(triggerBeat);
  var spectrum = fft.analyze();
  fft.analyze();
  peakDetect.update(fft);
  // beginShape();
  // for (i = 0; i < spectrum.length; i++) {
  //   vertex(i, map(spectrum[i], 0, 255, height, 0));
  // }
  // endShape();

  //micLevel = mic.getLevel();
  //ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height), 10, 10);
  console.log(ellipseWidth);
  ellipseWidth *= 0.95;
  ellipse(width / 2, height / 2, ellipseWidth, ellipseWidth);

}

