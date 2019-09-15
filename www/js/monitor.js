
let x = 0;
let j = 0;

function setup(){
  createCanvas(innerWidth,innerHeight);
}



function draw(){
  background(0,0,0,1)
  // stroke('black');
  noStroke();
    if(x>innerWidth*1.1){
      x=0;
    }
    // ellipse(innerWidth/2,innerHeight/2,i,i);
    x+=2;

    fill(0,255,0); // spectrum is green
    rect(x, innerHeight, 1, -map(Math.random(),0,1,0,innerHeight) );
}
