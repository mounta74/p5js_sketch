let audioContext;
let mic;
let pitch;
let freq = 0;

let modelUrl = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe'


// When the model is loaded
function modelLoaded() {
  console.log("Model loaded");
  pitch.getPitch(gotPitch);
}

function setup() {
  createCanvas(400, 400);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(modelUrl, audioContext , mic.stream, modelLoaded);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
  }
  pitch.getPitch(gotPitch);
}

function draw() {
  background(0)
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(64);
  text(freq.toFixed(2), width / 2, height - 100);
  
  let diff = freq - 440;
  //let amt = map(abs(diff), 0, 100, 0, 1);
  //let g = color(0, 255, 0);
  //let r = color(255, 0, 0);
  //let col = lerpColor(g, r, amt);
  //fill(col);
  //rect(200, 100, diff, 10);
  
  let alpha = map(abs(diff), 0, 100, 255, 0);
  
  rectMode(CENTER);
  fill(255, alpha);
  stroke(255);
  strokeWeight(1);
  if (abs(diff) < 1) {
      fill(0, 255, 0);
      }
  rect(200, 100, 200, 50);
  
  stroke(255);
  strokeWeight(4);
  line(200, 0, 200, 200);
  
  noStroke();
  fill(255, 0, 0);
  if (abs(diff) < 1) {
      fill(0, 255, 0);
      }
   rect(200 + diff/40, 100, 10, 75);
}




