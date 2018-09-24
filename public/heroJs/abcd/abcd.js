//
// prepare to use
//
particleFire.install( { THREE: THREE } );

var cometContainer = document.getElementById('comet');

var width  = $(cometContainer).width(),
    height = $(cometContainer).height(),
    clock = new THREE.Clock(),
    scene,
    camera,
    renderer,
    loader = new THREE.JSONLoader(),
    textureLoader = new THREE.TextureLoader();

scene  = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 40, width / height, 0.1, 1000 );
camera.position.z = 25;
camera.position.x = 10;
camera.position.y = 5;
// camera.position.z = 162;
// camera.lookAt(new THREE.Vector3(10,0,35));

 // add controls
//  cameraControl = new THREE.TrackballControls( camera );

renderer = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer.setSize( width, height );
// renderer.setClearColor( '#000000',1 );
renderer.setClearColor( '#000000',0 );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.backgroundColor = 'transparent';

cometContainer.appendChild( renderer.domElement );
// document.body.appendChild( renderer.domElement );

scene.add( new THREE.DirectionalLight( '#ccc' ) );
scene.add( new THREE.AmbientLight( '#666666' ) );
//0.25,2,150
var geometry = new particleFire.Geometry( 3,6,13000 );
var material = new particleFire.Material( { color: '#003fff' } );
material.setPerspective( camera.fov, height );
var particleFireMesh = new THREE.Points( geometry, material );
particleFireMesh.position.set(  0, -.18, 0 );
particleFireMesh.rotation.x = -1 * Math.PI;
scene.add( particleFireMesh );

// var sphereGeometry = new THREE.SphereGeometry(0.7, 1.4, 1.4);
// var sphereMaterial = new THREE.meshBasicMaterial();
// var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// earthMesh.name = 'earth';
// scene.add(earthMesh);


var boxGeometry = new THREE.BoxGeometry( 7, .6, 7 );
var boxMaterial = new THREE.MeshPhongMaterial( {
	color: '#ffffff',
	shininess: 1000
} );

var box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.set( 0, 0, 0 );
box.receiveShadow = true;
scene.add( box );

/*-------------------------------------------------------*/
/*-------------------------------------------------------*/

var string ='<div class="model-wrapper">'+
            '<x-model class="model" src="obj/sphere.gltf"></x-model>'+
            '<div class="model-text"></div>'+
            '</div>';


var scene2 = new THREE.Scene();

renderer2 = new THREE.CSS3DRenderer();
renderer2.setSize(width, height);
renderer2.domElement.style.position = 'absolute';
renderer2.domElement.style.top = 0;
// rebderer2.domElement.style.overflow = 'hidden';

cometContainer.appendChild( renderer2.domElement );
var clone = createCSS3DObject(string);

clone.position.set(0,3.5,0);

scene2.add(clone);

function createCSS3DObject(s) {
	// create outerdiv and set inner HTML from supplied string
	var div = document.createElement('div');
	div.innerHTML = s;

	// set some values on the div to style it, standard CSS
	// div.style.width = '0px';
	// div.style.height = '0px';
	div.style.opacity = 1;
	// div.style.display = 'flex';
	// div.style.justifyContent = 'center';
	// div.style.alignItems = 'center';
	div.style.background = 'none';

	// create a CSS3Dobject and return it.
	var object = new THREE.CSS3DObject(div);
	return object;
}

/*-------------------------------------------------------*/
/*-------------------------------------------------------*/

var SPEED = 0.01;

function rotateCube() {
    // box.rotation.x -= SPEED * 2;
    box.rotation.y -= SPEED;
    // box.rotation.z -= SPEED * 3;
}

( function update () {

	var delta = clock.getDelta();
	var elapsed = clock.getElapsedTime();

	// if ( elapsed > 30 ) { return; }

	requestAnimationFrame( update );

	rotateCube();

	particleFireMesh.material.update( delta );

	// update the camera
	// cameraControl.update();

	camera.lookAt( scene.position );
	renderer.render( scene, camera );
	renderer2.render( scene2, camera );

} )();


window.addEventListener( 'resize', function () {

	var width  = $(cometContainer).width(), height = $(cometContainer).height();

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
	// renderer2.setSize( width, height );

	particleFireMesh.material.setPerspective( camera.fov, height );

} );

// Jquery code for text reveal

$(document).ready(function(){
    $(".model-text").hover(function(){
        $('.model-text').html('Sample').promise().done(function(){});
        $(".model").css({display:'none'}).promise().done(function(){
            $('.model-text').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('.model-text').html('').promise().done(function(){});
            $('.model-text').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $(".model").css({display:'inline-block'}).promise().done(function(){
                $(".model").animate({transform:'scale(1,1)'});
        });
    });
});

// $('.model').animate({transform: "scale(1)"}, 5000, 'linear');
/*
$('.animate').animate({
    'opacity': '320'
}, {
    step: function (now, fx) {
        $(this).css({"transform": "translate3d(0px, " + now + "px, 0px)"});
    },
    duration: 10000,
    easing: 'linear',
    queue: false,
    complete: function () {
        alert('Animation is done');
    }
}, 'linear');
$(".animate").animate({ textIndent: 100 }, {
    duration : 10000,
    easing: 'linear',
    queue: false
});
*/