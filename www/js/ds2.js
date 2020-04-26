let osc;
let cnv;
let env;
let attackLevel = 0.3;
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

let comp;

let reverse = 0;

let sequencerInput;
let steps = [];
let step;
let timer;

let speed = 10000;
let interval = 1;

let tick = -1;
let tock;
let prevTock;


let starter;
let clear;

let crossings = []
let crossMenu;

function preload(){
  notes=loadJSON("js/notes.json");
  cross=loadJSON("js/crossing.json",setupCross);
  // console.log(notes);
  // console.log(cross);
}

function setupCross(){
  crossings=cross.crosses;
  crossDiv=document.querySelector('#crossings')
  crossMenu=createSelect();
  crossMenu.parent(crossDiv);
  for (let i = 0; i < crossings.length; i++) {
      crossMenu.option(crossings[i].num +" --- "+crossings[i].time+" on "+crossings[i].date);
      crossMenu.selectedIndex=[i];
  };
  crossMenu.changed(crossChange);
}

function crossChange(){
  let menuIndex = int(crossMenu.selected().charAt(0)+crossMenu.selected().charAt(1));
  let newSequence;
  console.log(menuIndex);
  if (menuIndex<16){
    newSequence=Math.random().toString(36).replace(/[^a-w]+/g, '').substr(0, 5);
  } else if(menuIndex>15){
    newSequence=(Math.random(+20)).toString(36).replace(/[^a-w]+/g, '');
  }
  sequencerInput.value(newSequence);
  // sequencerInput.value(crossMenu.selectedIndex);
  // let newSequence = scale[]
  // sequencerInput.value(newSequence);
};

function setup(){
  cnv = createCanvas(400, 400);
  cnv.id('canvas');
  cnv.parent().style="border-radius:25%"
  textAlign(CENTER);
  text('hello', width/2, height/2);

  delayTime=createSlider(100, 1000, 500);
  delayTime.addClass('slider');
  let delaycont=document.getElementById('delayTime');
  delayTime.parent(delaycont);

  feedback=createSlider(000, 900, 500);
  feedback.addClass('slider');
  let feedbackcont=document.getElementById('feedback');
  feedback.parent(feedbackcont);

  space=createSlider(0, 10000, 0);
  space.addClass('slider');
  let spacecont=document.getElementById('space');
  space.parent(spacecont);

  speed=createSlider(1, 100000, 10000);
  speed.addClass('slider');
  let speedcont=document.getElementById('speed');
  speed.parent(speedcont);


  sequencerInput = createInput("sequencer");
  // sequencerInput = createInput();
  sequencerInput.addClass('text-field');
  sequencerInput.addClass('sequencer');
  // sequencerInput.placeholder="SEQUENCER";
  comp = new p5.Compressor();

  env = new p5.Envelope();
  env.setADSR(attack, decay, sus, release);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType('sin');
  osc.amp(env);
  osc.start();


  delay = new p5.Delay();
  delay.process(osc, .7, .3, 20000);


  reverb = new p5.Reverb();
  reverb.process(osc, 3, 2, reverse);

  // comp.connect(delay,reverb);

  // console.log(notes.C[1]);

  noStroke();

  starter=createDiv('start');
  starter.addClass("starter");
  starter.mouseClicked(start);

  emptyfield=createInput();
  emptyfield.addClass('empty-field');
  emptyfield.placeholder="for mobile keyjammers";

  clear=createDiv('clear sequence');
  clear.addClass("clearSequence");
  clear.mouseClicked(()=>{sequencerInput.value("")});

  textSize(80);

}


function draw(){
  delay.delayTime(delayTime.value()/1000);
  delay.feedback(feedback.value()/1000);
  reverb.amp(space.value()/1000);


  interval=speed.value()/10000;
  background(color(255,25,255,10));

  sequencer(sequencerInput.value());
  // console.log(sequencerInput.value());



  //audiocontext starter
  if (getAudioContext().state !== 'running') {
    textSize(30);
    text('click blue to start', width/2, height/2);
  } else {
    text('', width/2, height/2);
  }
  rect(10,height/2-octave*10,10,10);
}
function start() {
  textSize(80);
  text('okay', width/2, height/2);
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function sequencer(letters){
  tick+=0.05*interval;
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


  if(octave>7){
  octave=1;
  }
  if(octave<0){
    octave=7;
  }
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
    text('⬇︎', width/2, height/2+15);
  } else if(key=="x"){
    octave++;
    text('⬆︎', width/2, height/2-15);
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

  if(steps.length<1){
    textSize(400);
    text(key,300,(30*tock)+405);
  } else{
    textSize(80);
    text(key,300,(30*tock)+10);
  }

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

function reverser(e){
  if(e.checked==false){
    reverb.set(3,2,0);
    reverse=0
    console.log('0')
  } else if(e.checked==true){
    reverb.set(3,2,1);
    reverse=1
    console.log('1')
  }
  e.disabled=true;
}


// function spaceOnly(e){
//   if(e.checked==true){
//     osc.disconnect();
//     delay.process(osc, .7, .3, 20000);
//     reverb.process(osc, 3, 2, reverse);
//   } else if(e.checke==false){
//     osc.connect();
//     delay.process(osc, .7, .3, 20000);
//     reverb.process(osc, 3, 2, reverse);
//   }
// }
