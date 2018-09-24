//
// prepare to use
//
particleFire.install( { THREE: THREE } );

var cometContainer = document.getElementById('comet'),
    cometContainer2 = document.getElementById('comet2'),
    cometContainer3 = document.getElementById('comet3'),
    cometContainer4 = document.getElementById('comet4'),
    cometContainer5 = document.getElementById('comet5'),
    cometContainer6 = document.getElementById('comet6');

var width  = $(cometContainer).width(),
    height = $(cometContainer).height(),
    clock = new THREE.Clock(),
    scene1,
    camera,
    renderer,renderer12,renderer13,renderer14,renderer15,renderer16
    loader = new THREE.JSONLoader(),
    textureLoader = new THREE.TextureLoader();

scene1  = new THREE.Scene();
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

renderer12 = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer12.setSize( width, height );
// renderer12.setClearColor( '#000000',1 );
renderer12.setClearColor( '#000000',0 );
renderer12.domElement.style.position = 'absolute';
renderer12.domElement.style.top = '0px';
renderer12.domElement.style.backgroundColor = 'transparent';

renderer13 = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer13.setSize( width, height );
// renderer13.setClearColor( '#000000',1 );
renderer13.setClearColor( '#000000',0 );
renderer13.domElement.style.position = 'absolute';
renderer13.domElement.style.top = '0px';
renderer13.domElement.style.backgroundColor = 'transparent';

renderer14 = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer14.setSize( width, height );
// renderer14.setClearColor( '#000000',1 );
renderer14.setClearColor( '#000000',0 );
renderer14.domElement.style.position = 'absolute';
renderer14.domElement.style.top = '0px';
renderer14.domElement.style.backgroundColor = 'transparent';

renderer15 = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer15.setSize( width, height );
// renderer15.setClearColor( '#000000',1 );
renderer15.setClearColor( '#000000',0 );
renderer15.domElement.style.position = 'absolute';
renderer15.domElement.style.top = '0px';
renderer15.domElement.style.backgroundColor = 'transparent';

renderer16 = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
renderer16.setSize( width, height );
// renderer16.setClearColor( '#000000',1 );
renderer16.setClearColor( '#000000',0 );
renderer16.domElement.style.position = 'absolute';
renderer16.domElement.style.top = '0px';
renderer16.domElement.style.backgroundColor = 'transparent';

cometContainer.appendChild( renderer.domElement );
cometContainer2.appendChild( renderer12.domElement );
cometContainer3.appendChild( renderer13.domElement );
cometContainer4.appendChild( renderer14.domElement );
cometContainer5.appendChild( renderer15.domElement );
cometContainer6.appendChild( renderer16.domElement );
// document.body.appendChild( renderer.domElement );

scene1.add( new THREE.DirectionalLight( '#ccc' ) );
scene1.add( new THREE.AmbientLight( '#666666' ) );
//0.25,2,150
var geometry = new particleFire.Geometry( 3,6,13000 );
var material = new particleFire.Material( { color: '#ff3030' } );/*#003fff */
material.setPerspective( camera.fov, height );
var particleFireMesh = new THREE.Points( geometry, material );
particleFireMesh.position.set(  0, -.18, 0 );
particleFireMesh.rotation.x = -1 * Math.PI;
scene1.add( particleFireMesh );

// var sphereGeometry = new THREE.SphereGeometry(0.7, 1.4, 1.4);
// var sphereMaterial = new THREE.meshBasicMaterial();
// var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// earthMesh.name = 'earth';
// scene1.add(earthMesh);


var boxGeometry = new THREE.BoxGeometry( 7, .6, 7 );
var boxMaterial = new THREE.MeshPhongMaterial( {
	color: '#ffffff',
	shininess: 1000
} );

var box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.set( 0, 0, 0 );
box.receiveShadow = true;
scene1.add( box );

/*-------------------------------------------------------*/
/*-------------------------------------------------------*/

var string =
            '<div class="model-wrapper">'+
            '<x-model class="models" id="model" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text"></div>'+
            '</div>'
            ;
var string2 ='<div class="model-wrapper">'+
            '<x-model class="models" id="model2" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text2"></div>'+
            '</div>';

var string3 ='<div class="model-wrapper">'+
            '<x-model class="models" id="model3" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text3"></div>'+
            '</div>';

var string4 ='<div class="model-wrapper">'+
            '<x-model class="models" id="model4" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text4"></div>'+
            '</div>';

var string5 ='<div class="model-wrapper">'+
            '<x-model class="models" id="model5" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text5"></div>'+
            '</div>'; 
            
var string6 ='<div class="model-wrapper">'+
            '<x-model class="models" id="model6" src="obj/logo.gltf"></x-model>'+
            '<div class="model-texts" id="model-text6"></div>'+
            '</div>';

var scene2 = new THREE.Scene(),
    scene22 = new THREE.Scene(),
    scene23 = new THREE.Scene(),
    scene24 = new THREE.Scene(),
    scene25 = new THREE.Scene(),
    scene26 = new THREE.Scene();

var renderer2, renderer22;
renderer2 = new THREE.CSS3DRenderer();
renderer2.setSize(width, height);
renderer2.domElement.style.position = 'absolute';
renderer2.domElement.style.top = '0';
renderer2.domElement.style.left = '0';
// rebderer2.domElement.style.overflow = 'hidden';

renderer22 = new THREE.CSS3DRenderer();
renderer22.setSize(width, height);
renderer22.domElement.style.position = 'relative';
renderer22.domElement.style.top = 0;
renderer22.domElement.style.left = 0;
// rebderer22.domElement.style.overflow = 'hidden';

renderer23 = new THREE.CSS3DRenderer();
renderer23.setSize(width, height);
renderer23.domElement.style.position = 'relative';
renderer23.domElement.style.top = 0;
renderer23.domElement.style.left = 0;
// rebderer22.domElement.style.overflow = 'hidden';

renderer24 = new THREE.CSS3DRenderer();
renderer24.setSize(width, height);
renderer24.domElement.style.position = 'relative';
renderer24.domElement.style.top = 0;
renderer24.domElement.style.left = 0;
// rebderer22.domElement.style.overflow = 'hidden';

renderer25 = new THREE.CSS3DRenderer();
renderer25.setSize(width, height);
renderer25.domElement.style.position = 'relative';
renderer25.domElement.style.top = 0;
renderer25.domElement.style.left = 0;
// rebderer22.domElement.style.overflow = 'hidden';

renderer26 = new THREE.CSS3DRenderer();
renderer26.setSize(width, height);
renderer26.domElement.style.position = 'relative';
renderer26.domElement.style.top = 0;
renderer26.domElement.style.left = 0;
// rebderer22.domElement.style.overflow = 'hidden';

cometContainer.appendChild( renderer2.domElement );
cometContainer2.appendChild( renderer22.domElement );
cometContainer3.appendChild( renderer23.domElement );
cometContainer4.appendChild( renderer24.domElement );
cometContainer5.appendChild( renderer25.domElement );
cometContainer6.appendChild( renderer26.domElement );

var clone = createCSS3DObject(string),
    clone2 = createCSS3DObject(string2),
    clone3 = createCSS3DObject(string3),
    clone4 = createCSS3DObject(string4),
    clone5 = createCSS3DObject(string5),
    clone6 = createCSS3DObject(string6);

clone.position.set(0,3.5,0);
clone2.position.set(0,3.5,0);
clone3.position.set(0,3.5,0);
clone4.position.set(0,3.5,0);
clone5.position.set(0,3.5,0);
clone6.position.set(0,3.5,0);

scene2.add(clone);
scene22.add(clone2);
scene23.add(clone3);
scene24.add(clone4);
scene25.add(clone5);
scene26.add(clone6);

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
	// div.style.background = 'green';

	// create a CSS3Dobject and return it.
	var object = new THREE.CSS3DObject(div);
	return object;
}

/*-------------------------------------------------------*/
/*-------------------------------------------------------*/

var SPEED = 0.03;

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

	camera.lookAt( scene1.position );
    renderer.render( scene1, camera );
    renderer2.render( scene2, camera );
    
    renderer12.render( scene1, camera );
    renderer22.render( scene22, camera );

    renderer13.render( scene1, camera );
    renderer23.render( scene23, camera );

    renderer14.render( scene1, camera );
    renderer24.render( scene24, camera );

    renderer15.render( scene1, camera );
    renderer25.render( scene25, camera );

    renderer16.render( scene1, camera );
    renderer26.render( scene26, camera );

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
    $("#model-text").hover(function(){
        $('#model-text').html('About Us').promise().done(function(){});
        $("#model").css({display:'none'}).promise().done(function(){
            $('#model-text').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text').html('').promise().done(function(){});
            $('#model-text').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model").css({display:'inline-block'}).promise().done(function(){
                $("#model").animate({transform:'scale(1,1)'});
        });
    });
    
    $("#model-text2").hover(function(){
        // alert('got ya !');
        $('#model-text2').html('Login').promise().done(function(){});
        $("#model2").css({display:'none'}).promise().done(function(){
            $('#model-text2').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text2').html('').promise().done(function(){});
            $('#model-text2').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model2").css({display:'inline-block'}).promise().done(function(){
                $("#model2").animate({transform:'scale(1,1)'});
        });
    });

    $("#model-text3").hover(function(){
        $('#model-text3').html('Events').promise().done(function(){});
        $("#model3").css({display:'none'}).promise().done(function(){
            $('#model-text3').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text3').html('').promise().done(function(){});
            $('#model-text3').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model3").css({display:'inline-block'}).promise().done(function(){
                $("#model3").animate({transform:'scale(1,1)'});
        });
    });

    $("#model-text4").hover(function(){
        $('#model-text4').html('Sponsers').promise().done(function(){});
        $("#model4").css({display:'none'}).promise().done(function(){
            $('#model-text4').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text4').html('').promise().done(function(){});
            $('#model-text4').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model4").css({display:'inline-block'}).promise().done(function(){
                $("#model4").animate({transform:'scale(1,1)'});
        });
    });

    $("#model-text5").hover(function(){
        $('#model-text5').html('Schedule').promise().done(function(){});
        $("#model5").css({display:'none'}).promise().done(function(){
            $('#model-text5').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text5').html('').promise().done(function(){});
            $('#model-text5').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model5").css({display:'inline-block'}).promise().done(function(){
                $("#model5").animate({transform:'scale(1,1)'});
        });
    });

    $("#model-text6").hover(function(){
        $('#model-text6').html('Contact Us').promise().done(function(){});
        $("#model6").css({display:'none'}).promise().done(function(){
            $('#model-text6').animate(
                {
                    fontSize:'2px',
                },500, 'easeOutBack',function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
        });
        }, function(){
            $('#model-text6').html('').promise().done(function(){});
            $('#model-text6').animate(
                {
                    fontSize:'0.5px',
                },0,function(){
                // alert('animate');
                // width:10px;
	            // height: 10px;
            });
            $("#model6").css({display:'inline-block'}).promise().done(function(){
                $("#model6").animate({transform:'scale(1,1)'});
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