

      let synths = [];

      class Synth{
        constructor(num){
          let t1 = 0.1; // attack time in seconds
          let l1 = 0.7; // attack level 0.0 to 1.0
          let t2 = 0.3; // decay time in seconds
          let l2 = 1; // decay level  0.0 to 1.0

          // this.size = random(10, 20);
          // this.color = color(random(100), 100, 100);

          this.env= new p5.Envelope(t1,l1,t2,l2);
          this.osc=new p5.Oscillator('sine');
          this.env.setRange(0.1,0);

          this.osc.freq((Math.random()*1000)+200);

        }
        play(){
          this.osc.start();
          console.log(this);
          this.env.play(this.osc);
        }
      }




      var container;
			var camera, scene, raycaster, renderer;

			var mouse = new THREE.Vector2(), INTERSECTED;
			var radius = 500, theta = 0;
			var frustumSize =1200;

			init();
			animate();
      var listener = new THREE.AudioListener();
      camera.add( listener );
      var sound = new THREE.Audio( listener );
      var audioLoader = new THREE.AudioLoader();
      audioLoader.load( 'samples/force3.mp3', function( buffer ) {
      	sound.setBuffer( buffer );
      	sound.setLoop( true );
      	sound.setVolume( 0.5 );
      	// sound.play();
      });
			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var aspect = window.innerWidth / window.innerHeight;
				camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf000f0 );

				var light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );

				var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

				for ( var i = 0; i < 100; i ++ ) {

					var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;

					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					object.scale.x = Math.random() +2;
					object.scale.y = Math.random() +2;
					object.scale.z = Math.random() +2;

					scene.add( object );

          let s = new Synth(i);
          synths.push(s);

				}

				raycaster = new THREE.Raycaster();

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				// stats = new Stats();
				// container.appendChild( stats.dom );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				var aspect = window.innerWidth / window.innerHeight;

				camera.left = - frustumSize * aspect / 2;
				camera.right = frustumSize * aspect / 2;
				camera.top = frustumSize / 2;
				camera.bottom = - frustumSize / 2;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

      function onDocumentMouseDown( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


      }
			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				// stats.update();

			}

			function render() {

				theta += 1;

				camera.position.x = radius * Math.sin( degtorad( theta ) );
				camera.position.y = radius * Math.sin( degtorad( theta ) );
				camera.position.z = radius * Math.cos( degtorad( theta ) );
				camera.lookAt( scene.position );

				camera.updateMatrixWorld();

				// find intersections

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( scene.children );

        if ( intersects.length > 0 ) {

          if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            synths[INTERSECTED.id].play();

          }

        } else {

          if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

          INTERSECTED = null;

        }


				renderer.render( scene, camera );

			}


      function degtorad(degrees)
      {
        var pi = Math.PI;
        return degrees * (pi/180);
      }
