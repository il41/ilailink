var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, (innerWidth/2)/(innerHeight/2), 10.1, 1000 );
camera.position.set( 0, 0, 200 );
const globalTime = new Date();
const gt = globalTime.getSeconds();
var renderer = new THREE.WebGLRenderer({
  antialias:false,alpha: true
  // preserveDrawingBuffer:false
});
renderer.autoClear=false;

renderer.setSize( innerWidth, innerHeight );
document.body.appendChild( renderer.domElement );

var directionalLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
scene.add( directionalLight );
//var mat1 = new THREE.MeshLambertMaterial ( { color: 0x0000ff } );
var mat1 = new THREE.MeshToonMaterial ( { color: 0x0000ff } );
var mat2 = new THREE.MeshLambertMaterial ( { color: 0xff00ff } );
var mat3 = new THREE.MeshLambertMaterial ( { color: 0x00ff00 } );
var cubeCluster
 function makeCubes(material){
   var Cgeometry = new THREE.SphereGeometry(  1, 10, );

   cubeCluster = new THREE.Object3D();

  for( let i=0; i < 50; i+= 1){
    var cube = new THREE.Mesh( Cgeometry, material );
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
    cubeCluster = null;
  }
// makeCubes();



 // setTimeout( draw, 1000 );
makeCubes(mat1);
makeCubes(mat2);
makeCubes(mat3);


// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create an Audio source
var look = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/aqua trance.mp3',
	// onLoad callback
	function ( audioBuffer ) {
		// set the audio object buffer to the loaded object
		look.setBuffer( audioBuffer );

		// play the audio
		look.play();
	}
);
// create an AudioAnalyser, passing in the sound and desired fftSize
var analyser = new THREE.AudioAnalyser( look, 32 );

// get the average frequency of the sound




// function playClick(){
//   sound.play();
// }
// function pauseClick(){
//   sound.pause();
// }

 function draw(){
//console.log(level);
   cubeCluster.rotation.y += 0.001;
  let spectrum = analyser.getFrequencyData();
  //console.log(spectrum);
  let bass = spectrum[5];
   cubeCluster.rotation.y = bass/255;
  // console.log(bass);
  // cubeCluster.rotation.z += 2;
  // cubeCluster.rotation.x += 0.001;
  var data = analyser.getAverageFrequency();

  cubeCluster.rotation.x +=analyser.getAverageFrequency()/100000;
  //cubeCluster.rotation.x += (Math.sin( Date.now()*0.02)*0.01 );

// let colorString = "rgb(" + data*100/data + ", 0, 0)";
// hexString = data.toString(16);
//console.log(hexString);
//mat1.color.set(hexString);

  renderer.render(scene, camera);
camera.position.set( 0, 0, 50+data/2 );
//document.body.style.background = "#f3f3f3 url('img_tree.png') no-repeat right top";
//console.log(data)
let d = new Date();
let time = d-globalTime;
let rData = Math.floor(time/500)
let gData = Math.floor(time/500)
let bData = Math.floor(time/200)
let colorString = "rgb(" +rData+ ","+ gData +", "+ bData +")";
document.body.style.backgroundColor = colorString;
// document.body.style.backgroundSize = data/100+"%";





 }
 //draw()
setInterval(draw, 1 );
