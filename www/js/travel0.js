let iw = innerWidth;
let ih = innerHeight;
let mysound;
let fft = new p5.FFT();
let canv;
let startVar = 1;

function preload() {
  soundFormats('mp3');
  mysound = loadSound('audio/plasticv1.mp3');
  mysound.setVolume(1);

}


function setup(){
  createCanvas(innerWidth,innerHeight);
  triangle(iw/2, ih/2, iw/2+iw/7, ih-ih/3, iw/2, ih/2+ih/3);
  noLoop();
  canv = document.getElementById('defaultCanvas0');
  console.log(canv);
  canv.addEventListener('click',()=>{
    if(startVar==1){
      loop();
      mysound.play();
    }
    startVar=0;
  });


}

// function start(){
//   loop();
//   mysound.play();
//   canv.removeEventListener('click');
// }



let i = 0;

function draw(){
  let spectrum = fft.analyze();
  noStroke();
  noFill();
  stroke('black');
    if(i>innerWidth*1.3){
      i=0;
    }
    ellipse(innerWidth/2,innerHeight/2,i,i);
    i+=2;

    fill(0,255,0); // spectrum is green
  for (let j = 0; j< spectrum.length; j++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[j], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

}
