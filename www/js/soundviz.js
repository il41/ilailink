let iw = innerWidth;
let ih = innerHeight;
let mysound;
let fft = new p5.FFT();
let canv;
let startVar = 1;
let value = 0;

let attack = 0.03;
let decay = 0.23;
let sus = 0;
let release = 0.23;

let attackLevel = 0.3;
let releaseLevel = 0;

let osc, playing, freq, amp;

let notes;
let octave=4;
let env;


function preload() {
  notes=loadJSON("js/notes.json");
  soundFormats('mp3');
  mysound = loadSound('audio/none.mp3');
  mysound.setVolume(1);
}

function setup(){
  env = new p5.Envelope();
  env.setADSR(attack, decay, sus, release);
  env.setRange(attackLevel, releaseLevel);
  canv = createCanvas(innerWidth,innerHeight);
  cnv = document.getElementById('defaultCanvas0');
  cnv.addEventListener('click',()=>{
    // if(startVar==1){
    //   loop();
    //   mysound.play();
    //   background(255,255,255);
    //   mysound.rate(0.4);
    // }
    startVar=0;
  });
  background(255,255,255);
  canv.mousePressed(playOscillator);
  osc = new p5.Oscillator();
 osc.setType('sin');
 osc.amp(env);
 osc.start();
}


// function drawCircle(x, y, radius, i1, i2) {
//   for (let j = 0; j <= 360; j++) {
//     rect(x, y, cos(j) * radius+i1, sin(j) * radius+i2);
//   }
// }


let c = 0;
let c2 = 0;

function draw(){
  let spectrum = fft.analyze();
  // stroke('black');
    if(c>20){
      c-=1;
    } else {
      c+=1;
    }

    // let low = spectrum[spectrum.length/2/2];
    let low = spectrum[50]*2;
    let mid = spectrum[spectrum.length/2]*2;
    let high = spectrum[spectrum.length/2*1.5]*2;
    let amp = spectrum.reduce((a,b)=>{
      return a+b;
    });
    // console.log(spectrum);
    stroke(color(mid,high,low));
    fill(mid,high,low);

    strokeWeight(15);


    // drawCircle(innerWidth/2,innerHeight/2,i,low,mid);

    let cr = 20;

    if(c2>=360){
      c2=0;
    }
    let x = width/2;
    let y = height/2;
    c = amp/20 +50;
    ellipse(cos(c2)/2*c+x, sin(c2)/2*c+y,1,1,10,10);

    c2+=1;

    background(color(mid*2,Math.abs(high-100*200),low,5));
    noFill();
    strokeWeight(70);

    low = spectrum[10]*2;
    stroke(0,0,low);
    quad(0,height,width,height,width,0,0,0);


    //Oscillator
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
    strokeWeight(1);
    textSize(40)
    // text('click to play', width/1.5, height/2);
    // text('freq: ' + freq, 20, 40);
    // text('amp: ' + amp, 20, 60);

    if (playing) {
      // smooth the transitions by 0.1 seconds
      osc.freq(freq, 0.1);
      osc.amp(amp, 0.1);
    }

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.3);
  playing = false;
}


function keyPressed() {
  let size = 50;
  // background('yellow');
  // background(color(keyCode*10-20));
  background(color(keyCode*10-20,keyCode*10-20,keyCode*10-20,100));
  textSize(180);
  strokeWeight(130);
  // text(`${key} ${keyCode}`,width/2,height/2);
  text(`${key} ${keyCode}`,(width/1.7),(height/2)-40);
  // print(key, ' ', keyCode);
  // console.log(key);
  // return false; // prevent default
  // console.log(key.toString(1));
  play(key,keyCode);
}

function play (key,keyCode){
  //octaves
  if(key=="z"){
    octave--;
    text('⬇︎', width/2.5, height/2+15);
  } else if(key=="x"){
    octave++;
    text('⬆︎', width/2.5, height/2-15);
  } else
  // console.log(key);
  //diatonic
  if (key=="a") {
    osc.freq(notes.C[octave]);
    env.play();
  } else if (key=="s"){
    osc.freq(notes.D[octave]);
    env.play();
  } else if (key=="d") {
    osc.freq(notes.E[octave]);
    env.play();
  } else if (key=="f") {
    osc.freq(notes.F[octave]);
    env.play();
  } else if (key=="g") {
    osc.freq(notes.G[octave]);
    env.play();
  } else if (key=="h") {
    osc.freq(notes.A[octave]);
    env.play();
  } else if (key=="j") {
    osc.freq(notes.B[octave]);
    env.play();
  } else if (key=="k") {
    osc.freq(notes.C[octave+1]);
    env.play();
  } else if (key=="l") {
    osc.freq(notes.D[octave+1]);
    env.play();
  } else if (key==";") {
    osc.freq(notes.E[octave+1]);
    env.play();
  }
  //chromatic
  else if (key=="w") {
    osc.freq(notes.Db[octave]);
    env.play();
  }else if (key=="e") {
    osc.freq(notes.Eb[octave]);
    env.play();
  }else if (key=="t") {
    osc.freq(notes.Gb[octave]);
    env.play();
  }else if (key=="y") {
    osc.freq(notes.Ab[octave]);
    env.play();
  }else if (key=="u") {
    osc.freq(notes.Bb[octave]);
    env.play();
  }else if (key=="o") {
    osc.freq(notes.Db[octave+1]);
    env.play();
  }else if (key=="p") {
    osc.freq(notes.Eb[octave+1]);
    env.play();
  }

  function keyCoder(keyCode){
  if(keyCode === undefined){
    return 0;
  }
  else return int(keyCode);
}

function playEnv()  {
  env.play();
}
  // fill(tock*20,20*200-tock*2,tock+tock*octave);
  // rect(100,0,100,keyCoder(keyCode));
  //
  // if(steps.length<1){
  //   textSize(400);
  //   text(key,300,(30*tock)+405);
  // } else{
  //   textSize(80);
  //   let txtpos=(30*tock)+10
  //   if(txtpos>430){txtpos=(txtpos%420)+10}
  //
  //   text(key,300,txtpos);
  //   console.log(tock);
  // }

  // ellipse(width/2,height/2,keyCoder(keyCode),100);
}
//
// class Particle{
//   constructor(){
//
//     this.pos = createVector(random(width), random(height));
//     // this.vel = createVector(random(-1, 1), random(-1, 1));
//     // this.accel = createVector(random(-0.06, 0.07), random(-.0014, .0020));
//     this.life = 0;
//     this.size = random(2, 8);
//     this.color = color(random(100), 100, 100);
//
//
//     this.osc=new p5.Oscillator();
//     this.osc.start();
//     this.osc.freq(map(this.pos.x,0,width,100,1000)+this.pos.y);
//     // this.slider=createSlider(100,1000,100,0.1);
//   }
//   update(){
//     this.vel.add(this.accel);
//     this.pos.add(this.vel);
//     this.osc.freq(map(this.pos.x,0,width,100,1000)+this.pos.y);
//     this.life ++;
//     if($this.life > 1000){
//
//     }
//   }
// }
