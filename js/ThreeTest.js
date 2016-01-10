var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
//converge flag
var goTo =false;
//diverge flag
var goBack =false;
//startime of convergence/divergence animation
var timeStart;
//FPS for covnergence animation update
var fps;
//Frame times for fps calculations
var lastFrame;
var currentFrame;
//Size of each cube
var blockSize = 1;

//Word to display
var word ="COMING SOON";
var sentence = sentenceFactory(word,blockSize*5,blockSize);


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var speed = Math.PI*2/(5*60); //RotationSpeed
var speedCD = 1000;
var cubes =[];
//Create cubes
for(var i=0;i<sentence.length;i++)
{
	var orbit = new OrbitCube();
	cubes.push(orbit);
	scene.add(orbit.cube);
}

//Lighting
var light = new THREE.PointLight( "white", 1, 100 );
light.position.set( 0, 0, 0 );
var ambL = new THREE.AmbientLight( "white" ); // soft white light
scene.add( light );
scene.add(ambL);
//Camera
camera.position.z=45;
camera.lookAt(new THREE.Vector3(0,0,0));

//Orbit update
function updateOrbits(){
	for(var i=0;i<cubes.length;i++)
	{
		cubes[i].rotateAboutWorldAxis(speed);
	}
};

//function to converge points to their destined position
function updateConverge()
{
	var y=0;
	var currentTime= new Date();
	var timeDif =(timeStart+speedCD)-(currentTime.getTime()); // 2000 is the speed of their convergence
	
	if(timeDif >=0){
		var y=0;
		for(var i=0;i<cubes.length;i++)
		{
			if(i%100 ==0) //create a new grid
				y++;

			//cubes[i].moveTo(new THREE.Vector3(((i%100)) -50,(y),0),timeDif);
			cubes[i].moveTo(new THREE.Vector3(sentence[i][0]*2 -(word.length*5*blockSize),sentence[i][1]*2),timeDif,fps);
			console.log();
			
		}
	}
};

//function to make blocks go back to their orbital positions
function updateDiverge()
{
	var y=0;
	var currentTime= new Date();
	var timeDif =(timeStart+speedCD)-(currentTime.getTime()); // 2000 is the speed of their convergence
	if(timeDif >=0){
		for(var i=0;i<cubes.length;i++)
		{
			cubes[i].moveBack(timeDif,fps);
		}
	}
	else
	{
		goBack =false;
	}
};

//Render Loop
function render() {
	currentFrame = new Date().getTime();
	fps = 1000/(currentFrame-lastFrame);
	lastFrame = currentFrame;
	if(!goTo && !goBack)
	{	
		updateOrbits();
	}
	else if(goTo)
	{
		updateConverge();
	}
	else
	{
		updateDiverge();
	}
	requestAnimationFrame(render);
	renderer.render( scene, camera );
}
render();
lastFrame = new Date().getTime()


//Random number between -1 and 1 
function rand()
{
	return (Math.random() -0.5)/0.5;

}
//returns random hex string of random color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function() {
	$(document).click(function(){
		if(!goTo)
   		{
   			goTo= true;
   			goBack =false;
   			timeStart = (new Date()).getTime();
   		}
   		else
   		{
   			goBack =true;
   			goTo =false;
   			timeStart = (new Date()).getTime();
   		}

	});
 });