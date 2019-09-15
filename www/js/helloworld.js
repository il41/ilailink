let fonts = [];
let index = 0;
function preload() {
  font0 = loadFont('fonts/PolanCanIntoGlassMakings.otf');
  font1 = loadFont('fonts/Hussar3DTwo.otf');
  font2 = loadFont('fonts/KetosagCBd.otf');
  font3 = loadFont('fonts/Koop.otf');
  fonts.push(font0);
  fonts.push(font1);
  fonts.push(font2);
  fonts.push(font3);


  soundFormats('mp3');
  mysound = loadSound('audio/be2v3.mp3');
  mysound.setVolume(1);
  mysound.rate(0.7);
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  textFont(fonts[index]);
  textSize(width / 20);
  textAlign(CENTER, CENTER);
}
let canvas = document.querySelector("#defaultCanvas0");
canvas.addListener('click',()=>{changeFont()});
console.log(canvas);

function draw() {
  // if(i<0){
  //   i=innerWidth*1;
  // }
  // rectMode(CENTER);
  // rect(innerWidth,innerHeight,i,i);
  // i-=4;
  // // let low = spectrum[spectrum.length/2/2];
  // let low = spectrum[60]*2;
  // let mid = spectrum[spectrum.length/2]*2;
  // let high = spectrum[spectrum.length/2*1.5]*2;
  // let amp = spectrum.reduce((a,b)=>{
  //   return a+b;
  // });





  background(0,0,0);
  let time = millis();
  rotateX(time / 10000);
  rotateZ(time / 12340);
  // fill(low,mid,high);
  
  text('Hello World', 0, 0);
}

function changeFont(){
  index++;
  if(index>3){
    index=0;
  }
  textFont(fonts[index]);
}
