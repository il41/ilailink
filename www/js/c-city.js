let iw = innerWidth;
let ih = innerHeight;
let mysound;
let fft = new p5.FFT();
let canv;
let startVar = 1;

function preload() {
  soundFormats('mp3');
  mysound = loadSound('audio/20191/be.mp3');
  mysound.setVolume(1);
  mysound.rate(0.7);

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
  // translate(0,0)

}

// function start(){
//   loop();
//   mysound.play();
//   canv.removeEventListener('click');
// }



let i = innerWidth/2;

function draw(){
  let spectrum = fft.analyze();
//  noStroke();

  noFill();
  // stroke('black');
    if(i<0){
      i=innerWidth*1;
    }
    rectMode(CENTER);
    rect(innerWidth,innerHeight,i,i);
    i-=4;
    // let low = spectrum[spectrum.length/2/2];
    let low = spectrum[60]*2;
    let mid = spectrum[150]*2;
    let high = spectrum[300]*2;
    let amp = spectrum.reduce((a,b)=>{
      return a+b;
    });
    // console.log(spectrum);
    stroke(color(mid,high,low));
    strokeWeight(4);
    background(color(low,mid,high,1));
    //stroke(map(spectrum[spectrum.length/2], 0, 255, height, 0))
    // stroke(spectrum.length[spectrum.length/2/2],spectrum.length[spectrum.length/2],spectrum.length[spectrum.length/2*1.5]); // spectrum is green
  // for (let j = 0; j< spectrum.length; j++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[j], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

}
