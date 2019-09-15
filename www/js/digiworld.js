let iw = innerWidth;
let ih = innerHeight;
let mysound;
let fft = new p5.FFT();
let canv;
let startVar = 1;

function preload() {
  soundFormats('mp3');
  mysound = loadSound('audio/8000/c001692 8000Hz.mp3');
  mysound.setVolume(1);
  mysound.rate(1);

}


function setup(){
  createCanvas(innerWidth,innerHeight);
  // triangle(iw/2, ih/2, iw/2+iw/7, ih-ih/3, iw/2, ih/2+ih/3);
  noLoop();
  canv = document.getElementById('defaultCanvas0');
  console.log(canv);
  canv.addEventListener('click',()=>{
    if(startVar==1){
      loop();
      mysound.play();
      spawnKuramon();
    }
    startVar=0;
  });


}

// function start(){
//   loop();
//   mysound.play();
//   canv.removeEventListener('click');
// }



let i = innerWidth*1.3;

function draw(){
  let spectrum = fft.analyze();
  let low = spectrum[60]*2;
  let mid = spectrum[spectrum.length/2]*2;
  let high = spectrum[spectrum.length/2*1.5]*2;
  let amp = spectrum.reduce((a,b)=>{
    return a+b;
  });
//  noStroke();
  strokeWeight(1);
  stroke(color('rgba('+mid*10+','+high+','+low+','+amp/255+')'));
  noFill();
  // stroke('black');
    if(i>innerWidth*1.3){
      i=100;
    }
    ellipse(innerWidth/2,innerHeight/2,i,i);
    i+=low/200*2;
    // let low = spectrum[spectrum.length/2/2];

    // console.log(spectrum);


    background(color(low,mid,amp/255,0.9));

    mid = spectrum[200]*2;
    high = spectrum[160]*2;
    fill(color(mid,low,high));
    strokeWeight(4);
    stroke(color('rgba('+mid*10+','+high+','+low/2+','+amp/255+')'));
    rect(innerWidth-100,20,200,20);
    //stroke(map(spectrum[spectrum.length/2], 0, 255, height, 0))
    // stroke(spectrum.length[spectrum.length/2/2],spectrum.length[spectrum.length/2],spectrum.length[spectrum.length/2*1.5]); // spectrum is green
  // for (let j = 0; j< spectrum.length; j++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[j], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h )
  // }

}





let kuramon;
function spawnKuramon(){
  kuramon = document.createElement('div');
  kuramon.innerHTML="";
  kuramon.id="kuramon";
  document.body.appendChild(kuramon);
  openWin();

  // let hello = document.createElement('div');
  // hello.innerHTML="hello!!";
  // hello.id="hello";
  // document.body.appendChild(hello);
}

function openWin()
{
myWindow=window.open("","","width=200,height=100,top=500,left=700");
myWindow.document.write("<head><title>@@@@@@djm.factorymark.co.jp/</title></head><p>hello!!</p>");

myWindow2=window.open("monitor.html","","width=400,height=100");
// myWindow2.document.write('<head><title>energyometer</title><style>body{margin:0;}</style><script src="js/p5.min.js"></script><script src="js/p5.sound.min.js"></script><script src="js/travel0.js"></script></head><body></body></html>');
}
