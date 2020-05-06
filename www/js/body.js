//needs

// let major = [43,45,48,50,51,52,54,55,57,60,62,63,64,66,67,69,72,74,75,76,78,79,81,84,86,87,88,90,91,93,96,98];
// let minor = [51,53,55,56,57,58,59,60,62,63,65,67,68,69,70,71,72,74,75,77,79,80,81,82,83,84,86,87,89,91,92,93];
let cMajPentMIDI = [52,55,57,60,62,64,67,69,72,74,76,79,81,84,86,88];
let cMajPent = []
// let dMaj = [];
// let eMaj = [];
// let fMaj = [];
// let gMaj = [];
// let aMaj = [];
// let bMaj = [];
// let cSharpMaj = [];
// let dSharpMaj = [];
// let fSharpMaj = [];
// let gSharpMaj = [];
// let aSharpMaj = [];
// let cMin = [];
// let dMin = [];
// let eMin = [];
// let fMin = [];
// let gMin = [];
// let aMin = [];
// let bMin = [];
// let cSharpMin = [];
// let dSharpMin = [];
// let fSharpMin = [];
// let gSharpMin = [];
// let aSharpMin = [];

let scale1=[261.63,293.66];
let soundLoop;

let a = 0.1;
let d = 0.7;
let s = 0.3;
let r = 0.1;
let dots = []
let columns = []
let oscillators = [];
let mCont = document.getElementById("matrix");

let hitEvent = new Event("hit");

function setup(){
  for (var i = 0; i < cMajPentMIDI.length; i++) {
    cMajPent.push(noteToFreq(cMajPentMIDI[i]));
  }

  class v{
    constructor(y){
      this.div=document.createElement("div",y.toString());
      this.osc= new p5.Oscillator();
      this.osc.freq(cMajPent[15-y]);
      this.env= new p5.Envelope(a,d,s,r)
      this.env.setInput(this.osc);
      this.env.setRange(0.2,0)
      this.osc.start();
      this.div.addEventListener("click",()=>{

      });
    }
  }
  class voice{
    constructor(x,y,oscillator){
      this.enabled=0;
      this.x=x;
      this.y=y;
      this.xHex=x.toString(16);
      this.yHex=y.toString(16);
      this.id=x.toString(16)+y.toString(16);
      this.offset=0;
      this.voice=oscillator;
      // console.log(oscillators[y]);
      this.div=document.createElement("div",x.toString());
      this.div.className = "voice";
      this.div.addEventListener("click",()=>{
        // console.log(this)
        if(this.enabled==0){
          this.enabled=1;
          this.div.style.backgroundColor="#00ff00";
          oscillator.env.play();
          render();
          console.log(this.x+","+this.y);
        } else if(this.enabled==1){
          this.enabled=0;
          this.div.style.backgroundColor="#0000ff";
        }
      });
      this.div.addEventListener("hit",()=>{
        oscillator.env.play();
      })
      this.div.style.backgroundColor="#0000ff";
      mCont.appendChild(this.div);
      this.play = ()=>{
        // console.log("hey");
        // if(this.enabled==true){
          oscillator.env.play();
        // }
      }

    }
  }
  for (var i = 0; i < 16; i++) {
      columns.push([]);
  }

  for (let y=0;y<16;y++){
    let oscillator = new v(y);
    oscillators.push(oscillator);

    for(let x=0;x<16;x++){
      let o = new voice(x,y,oscillator)
      columns[x].push(o);
      dots.push(o);
    }
  }
  for (var i = 0; i < oscillators.length; i++) {
    oscillators[i].env.setADSR(a,d,s,r)
  }
// oscillators[i].env.setADSR(a,d,s,r);
  let btn = document.getElementById("btn1")
  btn.addEventListener('click',()=>{
    // oscillators.forEach((item, index) => console.log(`${index}:${item}`))
    // console.log(oscillators)
    for (var i = 0; i < dots.length; i++) {
      // oscillators[i].osc.freq(dMin[i+10]);
      // oscillators[i].env.setADSR(a,d,s,r);
      // console.log(dots[i]);
      dots[i].enabled=0;
      dots[i].div.style.backgroundColor="#0000ff";
    }
  })


  let cnv = createCanvas(100, 100);
  cnv.position(500,200);
   cnv.mousePressed(canvasPressed);
   colorMode(HSB);
   background(0, 0, 86);
   text('tap to start/stop', 10, 20);

   //the looper's callback is passed the timeFromNow
   //this value should be used as a reference point from
   //which to schedule sounds
   let intervalInSeconds = 0.2;
   soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
}

function noteToFreq(note) {
    let a = 440; //frequency of A (coomon value is 440Hz)
    return (a / 32) * (2 ** ((note - 9) / 12));
}

function render(){
  //fun background css here
}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  if (soundLoop.isPlaying) {
    soundLoop.stop();
    let nows = document.querySelectorAll(".now");
    for (var i = 0; i < nows.length; i++) {
      nows[i].classList.remove("now");
    }
  } else {
    // start the loop
    soundLoop.start();
  }
}


function onSoundLoop(timeFromNow) {
  let oldIndex = (Math.abs((soundLoop.iterations - 2) % columns.length));
  let noteIndex = (soundLoop.iterations - 1) % columns.length;
  // console.log(soundLoop.iterations+" "+noteIndex);

  // columns[noteIndex].playC(play, 0.5, timeFromNow);
  playColumn(noteIndex,oldIndex);
  // background(noteIndex * 360 / notePattern.length, 50, 100);
}
let last;
function playColumn(col,old){
  for (var i = 0; i < columns[col].length; i++) {
    columns[old][i].div.classList.remove("now");
    columns[col][i].div.classList.add("now");
    if(columns[col][i].enabled){
      columns[col][i].play();

    }
  }
  // for (var i = 0; i < columns[col].length; i++) {
  //   // columns[col][i].div.classList.add("now");
  //
  //   if(col>10){
  //     last = col-1
  //     columns[last][i].div.classList.remove("now");
  //   } else {
  //     last=15;
  //     columns[last][i].div.classList.remove("now");
  //   }
  //   console.log(last);
  //
  // }
}
