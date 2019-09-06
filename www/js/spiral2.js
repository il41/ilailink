let iw = innerWidth;
let ih = innerHeight;
let mysound;
let fft = new p5.FFT();
let canv;
let startVar = 1;

function preload() {
  soundFormats('mp3');
  mysound = loadSound('audio/none.mp3');
  mysound.setVolume(1);
  mysound.rate(0.9);

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
      background(255,255,255);
    }
    startVar=0;
  });


}

// function start(){
//   loop();
//   mysound.play();
//   canv.removeEventListener('click');
// }


// function drawCircle(x, y, radius, i1, i2) {
//   for (let j = 0; j <= 360; j++) {
//     rect(x, y, cos(j) * radius+i1, sin(j) * radius+i2);
//   }
// }


let i = 0;
let j = 0;

function draw(){
  // rotate(j);
  // noFill();
  let spectrum = fft.analyze();
  // stroke('black');
    if(i>innerWidth/2){
      i=0;
    }

    i+=0.92;
    // let low = spectrum[spectrum.length/2/2];
    let low = spectrum[50]*2;
    let mid = spectrum[spectrum.length/2]*2;
    let high = spectrum[spectrum.length/2*1.5]*2;
    let amp = spectrum.reduce((a,b)=>{
      return a+b;
    });
    // console.log(spectrum);
    stroke(color(mid,high,low));
    fill(high,low,mid);

    strokeWeight(15);


    // drawCircle(innerWidth/2,innerHeight/2,i,low,mid);

let cr = 20;

    if(j>=360){
      j=0;
    }
    let x = width/2;
    let y = height/2;
    point(cos(j)/2*i+x, sin(j)/2*i+y,1,1);

    j+=3.1;



    background(color(mid*2,low,Math.abs(high-100*200),5));
    noFill();
    strokeWeight(150);

    low = spectrum[10]*2;
    stroke(low/2,0,low);
    quad(0,height,width,height,width,0,0,0);

    // background(color(mid/255,high/255,low/255,1));
    //stroke(map(spectrum[spectrum.length/2], 0, 255, height, 0))
    // stroke(spectrum.length[spectrum.length/2/2],spectrum.length[spectrum.length/2],spectrum.length[spectrum.length/2*1.5]); // spectrum is green
  // for (let j = 0; j< spectrum.length; j++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[j], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

}
