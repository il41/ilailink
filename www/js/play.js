let osc;
let cnv;
let env;
let attackLevel = 0.7;
let releaseLevel = 0;

let attack = 0.03;
let decay = 0.23;
let sus = 0;
let release = 0.23;

let notes;

let octave=4;

let delay;

let delayTime;
let feedback;

let sequencerInput;
let steps = [];
let step;
let timer;
let interval = 10000;
let countdown;
let tick = 0;
let tock;
let prevTock;

function preload(){
  notes=loadJSON("notes.json");
  birds=loadJSON("birds.json");
  console.log(birds);
  console.log(notes);

}



function setup(){

  cnv = createCanvas(400, 400);
  cnv.parent().style="border-radius:25%"
  textAlign(CENTER);
  text('hello', width/2, height/2);

  delayTime=createSlider(100, 1000, 500);
  let delaycont=document.getElementById('delayTime');
  delayTime.parent(delaycont);
  feedback=createSlider(000, 999, 500);
  let feedbackcont=document.getElementById('feedback');
  feedback.parent(feedbackcont);


  sequencerInput = createInput();

  env = new p5.Envelope();
  env.setADSR(attack, decay, sus, release);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType('sin');
  osc.amp(env);
  osc.start();

  delay = new p5.Delay();
  delay.process(osc, .7, .3, 20000);


  console.log(notes.C[1]);

  noStroke();


}

function draw(){
  timer = millis() + interval;
  countdown = ceil((timer-millis())/1000);

  delay.delayTime(delayTime.value()/1000);
  delay.feedback(feedback.value()/1000);
  background(color(255,25,255,2));

  sequencer(sequencerInput.value());
  // console.log(sequencerInput.value());

}

function sequencer(letters){
  tick+=0.05;
  tock=ceil(tick);



  steps=letters.split('');
  step=steps[floor(tick)];
  // console.log(steps);
  if(tock>prevTock){
    play(step,tock*10);
    console.log(step);
  }
  if(tock>steps.length-1){
    tick=-1;
  }
  prevTock=tock;
}


function keyPressed() {
  // background('yellow');
  background(color(keyCode*10-20));
  textSize(80);
  // text(`${key} ${keyCode}`,width/2,height/2);
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
  } else if(key=="x"){
    octave++;
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
  fill(tock*20,20*200-tock*2,tock+tock*octave);
  rect(100,0,100,keyCoder(keyCode));
  // ellipse(width/2,height/2,keyCoder(keyCode),100);
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
