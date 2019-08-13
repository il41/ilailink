var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, (innerWidth/2)/(innerHeight/2), 10.1, 1000 );
camera.position.set( 0, 0, 20 );

var renderer = new THREE.WebGLRenderer({
  antialias:false,alpha: true
  // preserveDrawingBuffer:false
});
renderer.autoClear=true;

renderer.setSize( innerWidth, innerHeight );
document.body.appendChild( renderer.domElement );

var clock = new THREE.Clock;
clock.start();

var directionalLight = new THREE.AmbientLight( 0x0000ff, 0x00ff00, 0.6 );
scene.add( directionalLight );
var mat1 = new THREE.MeshLambertMaterial ( { color: 0x0000ff } );
var cubeCluster
 function makeCubes(){


   cubeCluster = new THREE.Object3D();

  for( var i=0; i < 2000; i+= 1){
    var Cgeometry = new THREE.BoxGeometry(  Math.random(), Math.random(), Math.random());
    var cube = new THREE.Mesh( Cgeometry );
    cube.addEventListener("click",cubePaint)
    cube.position.x = Math.random() * 50 -25
    cube.position.y = Math.random() * 50 -25
    cube.position.z = Math.random() * 50 -25
    cubeCluster.add( cube );

    //makeCubes();
    //console.log('hey',i)
    }

   scene.add( cubeCluster );
  }

  function cubePaint(e){
    console.log(e);
    e.color = new THREE.color(Math.random(),Math.random(),Math.random());
  }




  function newCubes(){
    cubeCluster = 0;
  }
// makeCubes();



 // setTimeout( draw, 1000 );
makeCubes();


let z = 0;
cubeCluster.rotation.x += 10;

 function draw(){
	 updateClock();
//console.log(level);

	cubeCluster.rotation.z += z;
   cubeCluster.rotation.y += 0.000;
	 let date1 = new Date
	 let color = new THREE.Color( date1.getMilliseconds()/1000, 0, date1.getSeconds()/60 );
	 mat1.color.set(color);
  // cubeCluster.rotation.z += 2;
  // cubeCluster.rotation.x += 0.001;
  //cubeCluster.rotation.x += (Math.sin( Date.now()*0.02)*0.01 );


  renderer.render(scene, camera);
 }
 //draw()
setInterval(draw, 1 );






//clock


function rotateToggle(){
	z += 0.0002
}

function updateClock ( )
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
  var currentMillis = currentTime.getMilliseconds ( );
  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  currentMillis = ( currentMillis < 10 ? "0" : "" ) + currentMillis;
  currentMillis = ( currentMillis < 100 ? "0" : "" ) + currentMillis;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds +":"+ currentMillis + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").innerHTML = currentTimeString;
}
