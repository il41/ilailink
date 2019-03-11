function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('audio/20191/be.mp3');
}

function setup() {
  mySound.setVolume(1);
  mySound.play();
  fft = new p5.FFT();
  createCanvas(200, 200);
  background(255, 0, 200);

}

function draw(){
  let theDiv = document.getElementById('yo');
  var waveform = fft.waveform();
  console.log(waveform);
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length/2, 0, width);
    var y = map( waveform[i], -0.9, 0.9, 0, height);
    vertex(x,y);

  }
  background(waveform.length/2);
  endShape();
}
