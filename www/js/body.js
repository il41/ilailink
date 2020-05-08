//needs adsr, delay, scale change

// let major = [43,45,48,50,51,52,54,55,57,60,62,63,64,66,67,69,72,74,75,76,78,79,81,84,86,87,88,90,91,93,96,98];
// let minor = [51,53,55,56,57,58,59,60,62,63,65,67,68,69,70,71,72,74,75,77,79,80,81,82,83,84,86,87,89,91,92,93];
let cMajPentMIDI = [52,55,57,60,62,64,67,69,72,74,76,79,81,84,86,88];
let cMinPentMIDI = [51,55,56,60,62,63,67,68,72,74,75,79,80,83,86,87];
let major= [-5,-3,-1,0,2,4,5,7,9,11,12,14,16,17,19,21,22];
let lydian= [-5,-3,-1,0,2,4,6,7,9,11,12,14,16,18,19,21,22];
let minor= [-5,-2,-2,0,2,3,5,7,8,10,12,14,15,17,19,21,22];
let dorian= [-5,-3,-2,0,2,3,5,7,9,10,12,14,15,17,19,21,23];
let cMajPent = []
let cMinPent = []
let scale=[];

let dataObj;
let input;
let img;
let hex;
let imgType;

let imgDots=[];

let hImage = document.getElementById("hImage");

function handleFile(file) {
  // let tempCanvas = document.createElement('canvas');
  // let ctx = tempCanvas.getContext('2d');
  // canvas.id = "temp";
  // canvas.width  = 16;
  // canvas.height = 16;
  // print(file);
  if (file.type === 'image') {
    imgDots.splice(0, imgDots.length);
    for (var i = 0; i < dots.length; i++) {
      dots[i].enabled=false;
      dots[i].div.style.backgroundColor=inactiveColor;
    }
    dataObj=file;
    imgType=file.subtype;
    img = createImg(file.data, '');
    img.hide();
    let pixIndex=0;
    img=loadImage(file.data,()=>{
      img.loadPixels();
      for(let y=0; y<img.height; y+=Math.floor(img.height/16)){
        for(let x=0; x<img.width; x+=Math.floor(img.width/16)){
          let index=(x+y*img.width)*4;
          let r = img.pixels[index+0];
          let g = img.pixels[index+1];
          let b = img.pixels[index+2];
          let bright=(r+g+b)/3;

          if(bright>100){
            dots[pixIndex].enabled=true;
            dots[pixIndex].div.style.backgroundColor=activeColor;
          }
          pixIndex++;
        }
      }
    });
    img.loadPixels();


    // dataObj.data=hexSize(img);
    // hImage.src=dataObj.data;


    // function hexSize(img){
    //   let newDataUrl;
    //   let image = new Image();
    //   image.src = img;
    //   let oldWidth = image.width;
    //   let oldHeight = image.height;
    //
    //   // Create a temporary canvas to draw the downscaled image on.
    //   let canvas = document.createElement("canvas");
    //   canvas.width = 160;
    //   canvas.height = 160;
    //
    //   // Draw the downscaled image on the canvas and return the new data URL.
    //   let ctx = canvas.getContext("2d");
    //   // console.log(ctx);
    //   ctx.drawImage(image, 0, 0, 16, 16);
    //   newDataUrl = canvas.toDataURL(imgType, 0);
    //   return newDataUrl;
    // }


  } else {
    img = null;
  }
  // console.log(hexSize(img));


}
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

let scale1=[];
let soundLoop;

let a = 0.01;
let d = 0.5;
let s = 0;
let r = 0.2;
let dots = []
let columns = []
let oscillators = [];
let mCont = document.getElementById("matrix");

let activeColor="#00ff00";
let inactiveColor="#0000ff";

function setup(){
  for (var i = 0; i < cMajPentMIDI.length; i++) {
    cMajPent.push(noteToFreq(cMajPentMIDI[i]));
  }
  reverb = new p5.Reverb();
  delay = new p5.Delay();

  let uploadBtn = document.querySelector("#btn0");
  input = createFileInput(handleFile);
  input.addClass("file");
  input.id("file");
  input.parent(uploadBtn);


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
          this.div.style.backgroundColor=activeColor;
          oscillator.env.play();
          console.log(this.x+","+this.y);
        } else if(this.enabled==1){
          this.enabled=0;
          this.div.style.backgroundColor=inactiveColor;
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

  delay.amp(0);
  delay.delayTime(0.5);
  delay.feedback(0.4);
  for (var i = 0; i < oscillators.length; i++) {
    oscillators[i].env.setADSR(a,d,s,r)
    delay.process(oscillators[i].osc);
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
      dots[i].div.style.backgroundColor=inactiveColor;
    }
  })

  let btn2 = document.getElementById("btn2")
  let randomslider= document.querySelector(".randomfactor")
  randomslider.value=0.9;
  btn2.addEventListener('click',()=>{
    btn.click();
    for (var i = 0; i < dots.length; i++) {
      // oscillators[i].osc.freq(dMin[i+10]);
      // oscillators[i].env.setADSR(a,d,s,r);
      // console.log(dots[i]);
      // dots[i].enabled=(Math.random() >= 0.9);
      dots[i].enabled=(Math.random() >= parseFloat(randomslider.value));
      if(dots[i].enabled){
        dots[i].div.style.backgroundColor=activeColor;
      } else {
        dots[i].div.style.backgroundColor=inactiveColor;
      }

    }
  })

  // let btn3 = document.getElementById("btn3")
  // btn3.addEventListener('click',()=>{
  let select = document.querySelector("#scales");
  select.value="MajorPent"
  select.addEventListener('change',()=>{
    if(select.value=="MajorPent"){
      inactiveColor="#0000ff";
      scale1.splice(0, scale1.length)
      for (let i = 0; i < cMajPentMIDI.length; i++) {

        scale1.push(noteToFreq(cMajPentMIDI[i]-0));
      }
    } else if(select.value=="MinorPent"){
      inactiveColor="#ff00ff";
      scale1.splice(0, scale1.length)
      for (let i = 0; i < cMinPentMIDI.length; i++) {

        scale1.push(noteToFreq(cMinPentMIDI[i]-0));
      }
    } else if (select.value=="Major"){
      inactiveColor="#a0a0af";
      scale1.splice(0, scale1.length)
      for (let i = 0; i < major.length; i++) {

        scale1.push(noteToFreq(major[i]+60));
      }
    } else if (select.value=="Lydian"){
      inactiveColor="#f0dfdf";
      scale1.splice(0, scale1.length)
      for (let i = 0; i < lydian.length; i++) {

        scale1.push(noteToFreq(lydian[i]+60));
      }
    } else if (select.value=="Dorian"){
      inactiveColor="#0cc0c0";
      scale1.splice(0, scale1.length)
      for (let i = 0; i < dorian.length; i++) {

        scale1.push(noteToFreq(dorian[i]+60));
      }
    }

    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].osc.freq(scale1[15-i]);

      for (let i = 0; i < dots.length; i++) {
        if(dots[i].enabled!=1){
          dots[i].div.style.backgroundColor=inactiveColor;
        }
      }
      // oscillators[i].env.setADSR(a,d,s,r);
      // console.log(dots[i]);
    }
  })

  let speed = document.querySelector(".speed");
  speed.value=0.2;
  speed.addEventListener("change",()=>{
    soundLoop.interval=parseFloat(speed.value);
    // console.log(speed.value)
  })

  let attack = document.querySelector(".attack");
  attack.value=0.01;
  attack.addEventListener("change",()=>{
    a=parseFloat(attack.value);
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].env.setADSR(a,d,s,r);
    }
  })

  let decay = document.querySelector(".decay");
  decay.value=0.5;
  decay.addEventListener("change",()=>{
    d=parseFloat(decay.value);
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].env.setADSR(a,d,s,r);
    }
  })

  let waves = document.querySelector("#waves");
  waves.value="sine"
  waves.addEventListener('change',()=>{
    if(waves.value=="sine"){
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].osc.setType("sine");
      }
    } else if(waves.value=="tri"){
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].osc.setType("triangle");
      }
    } else if(waves.value=="saw"){
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].osc.setType("sawtooth");
      }
    } else if(waves.value=="square"){
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].osc.setType("square");
      }
    } else if(waves.value=="random"){
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].osc.setType("sine");
      }
    }
  })

  let delayAmp = document.querySelector(".delayamp");
  delayAmp.value=0;
  delayAmp.addEventListener("change",()=>{
      console.log(delayAmp.value)
    delay.amp(parseFloat(delayAmp.value));
    // console.log(speed.value)
  })

  let feedback = document.querySelector(".delayfeedback");
  feedback.value=0.4;
  delay.feedback(parseFloat(feedback.value));
  feedback.addEventListener("change",()=>{
    delay.feedback(parseFloat(feedback.value));
    // console.log(speed.value)
  })

  let delayTime = document.querySelector(".delaytime");
  delayTime.value=0.5;
  delay.delayTime(parseFloat(delayTime.value));
  delayTime.addEventListener("change",()=>{
    delay.delayTime(parseFloat(delayTime.value));
    // console.log(speed.value)
  })


  let reverbAmp = document.querySelector(".reverbamp");
  reverbAmp.value=1;
  reverbAmp.addEventListener("change",()=>{
    reverb.amp(parseFloat(reverbAmp.value));
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
