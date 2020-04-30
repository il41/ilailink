
let synths = [];
function preload(){
  notes=loadJSON("js/notes.json");

}
class Synth{
  constructor(num){
    let t1 = 0.1; // attack time in seconds
    let l1 = 0.7; // attack level 0.0 to 1.0
    let t2 = 0.3; // decay time in seconds
    let l2 = 0.1; // decay level  0.0 to 1.0

    // this.size = random(10, 20);
    // this.color = color(random(100), 100, 100);

    this.env= new p5.Envelope(t1,l1,t2,l2);
    this.osc=new p5.Oscillator('sine');

    this.osc.freq((Math.random()*1000)+20);
  }
  play(){
    this.osc.start();
    console.log(this);
    this.env.play(this.osc);
  }
}
function setup(){

}

function draw(){

}
for (var i = 0; i < 100; i++) {
  let e = document.createElement("div");
  e.className="box";
  e.id="box"+i;
  document.body.appendChild(e);
  let s = new Synth(i);
  synths.push(s);
  e.addEventListener("click",()=>{
    s.play()
    // console.log(e);
  })


}
