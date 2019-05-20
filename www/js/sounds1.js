let displayDiv;
let playDiv;


function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('audio/20191/be.mp3');
}


function setup() {
  playDiv = document.createElement('div');
  document.body.appendChild(playDiv);
  playDiv.id = "playButton";
  playDiv.innerHTML = "play! (click wave to change speed)";
  playDiv.style.cursor = "crosshair";

  playDiv.addEventListener("click", () => {
    mySound.play();
    playDiv.style.display = "none";
    displayDiv = document.createElement('div');
    document.body.appendChild(displayDiv);
    displayDiv.id = "speedometer";
    displayDiv.innerHTML = mySound.getPlaybackRate();
    displayDiv.style.cursor = "crosshair";
  });



  mySound.rate(0.7);
  mySound.setVolume(1);
  //mySound.play();
  fft = new p5.FFT();
  createCanvas(200, 200);
  background(255, 0, 200);
  textSize(32);
  text('click me', 10, 30);
}


document.body.addEventListener("click", () => {
  mySound.rate(Math.random()+0.4);
});


document.body.addEventListener("click", () => {
  displayDiv.innerHTML = mySound.getPlaybackRate();
});


function draw(){
  let theDiv = document.getElementById('yo');

  var waveform = fft.waveform();
  //console.log(waveform);
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
