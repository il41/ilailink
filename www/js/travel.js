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
//  noStroke();

  noFill();
  // stroke('black');
    if(i>innerWidth*1.3){
      i=0;
    }
    ellipse(innerWidth/2,innerHeight/2,i,i);
    i+=4;
    // let low = spectrum[spectrum.length/2/2];
    let low = spectrum[60]*2;
    let mid = spectrum[spectrum.length/2]*2;
    let high = spectrum[spectrum.length/2*1.5]*2;
    let amp = spectrum.reduce((a,b)=>{
      return a+b;
    });
    // console.log(spectrum);
    stroke(color(mid,high,low));
    strokeWeight(4);
    background(color(255,255,amp/255,10));
    //stroke(map(spectrum[spectrum.length/2], 0, 255, height, 0))
    // stroke(spectrum.length[spectrum.length/2/2],spectrum.length[spectrum.length/2],spectrum.length[spectrum.length/2*1.5]); // spectrum is green
  // for (let j = 0; j< spectrum.length; j++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[j], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

}
