var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, (innerWidth/2)/(innerHeight/2), 0.1, 1000 );
camera.position.set( 0, 0, 200 );

var renderer = new THREE.WebGLRenderer({
  antialias:false,alpha: false,
   preserveDrawingBuffer:true
});
renderer.autoClear=false;

renderer.setSize( innerWidth, innerHeight );
document.body.appendChild( renderer.domElement );

var directionalLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 1.6 );
scene.add( directionalLight );
var mat1 = new THREE.MeshToonMaterial ( { color: 0xff00ff } );
var cubeCluster
 function makeCubes(){
   var Cgeometry = new THREE.SphereGeometry(  10, 1,1,1 );

   cubeCluster = new THREE.Object3D();

  for( let i=0; i < 5; i+= 1){
    var cube = new THREE.Mesh( Cgeometry, mat1 );
    cube.position.x = Math.random() * 100 -50
    cube.position.y = Math.random() * 100 -50
    cube.position.z = Math.random() * 100 -50
    cubeCluster.add( cube );

    //makeCubes();
    console.log('hey',i)
    }

   scene.add( cubeCluster );
  }
  function newCubes(){
    cubeCluster = 0;
  }
// makeCubes();



 // setTimeout( draw, 1000 );
makeCubes();



// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create an Audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/8000/4Djet 8000hz.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(1);
	// sound.play();
});

let play = document.createElement("div")
play.id = "play";
play.innerHTML = "play";
play.addEventListener('click',()=>{
  sound.play();
})

let pause = document.createElement("div")
pause.id = "pause";
pause.innerHTML = "pause";
pause.addEventListener('click',()=>{
  sound.pause();
})

let toggle = document.createElement("div")
toggle.id = "toggle";
toggle.innerHTML = "toggle";
toggle.addEventListener('click',()=>{
  toggleDraw();
})

function toggleDraw(){
  if (renderer.autoClear==true) {
    renderer.autoClear=false;
  } else{
    renderer.autoClear = true;
  }
}

document.body.appendChild(play);
document.body.appendChild(pause);
document.body.appendChild(toggle);
// create an AudioAnalyser, passing in the sound and desired fftSize
var analyser = new THREE.AudioAnalyser( sound, 32 );

// get the average frequency of the sound







 function draw(){
//console.log(level);
   cubeCluster.rotation.y += 100;
   //cubeCluster.rotation.z += 0.001;
   //cubeCluster.rotation.x += 0.001;
  var data = analyser.getAverageFrequency();

  cubeCluster.rotation.x +=analyser.getAverageFrequency()/10000;
  //cubeCluster.rotation.x += (Math.sin( Date.now()*0.02)*0.01 );

let colorString = "rgb(" + data*100/data + ", 0, 0)";
hexString = data.toString(16);
//console.log(hexString);
//mat1.color.set(hexString);

  renderer.render(scene, camera);
  camera.position.set( 0, 0, 150 );
//camera.position.set( 0, 0, 100+data/2 );


 }
 //draw()
setInterval(draw, 1 );
