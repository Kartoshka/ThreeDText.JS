OrbitCube = function(){

	var targetColor ={r:0,g:(166/255),b:(185/255)};
	this.x = rand()*20;
	this.y = rand()*20;
	this.z = rand()*20;
	this.color = new THREE.Color();
	this.geometry = new THREE.BoxGeometry(blockSize,blockSize,blockSize); 

	this. material = new THREE.MeshPhongMaterial( { color: getRandomColor(), specular: getRandomColor(), shininess: 30, shading: THREE.FlatShading } );
	this.color.copy(this.material.color);

	this.cube = new THREE.Mesh(this.geometry, this.material);
	this.initialPosition = new THREE.Vector3(this.x, this.y, this.z);

	//Create a new random normalized vector, uses equal area projection of a sphere onto a cylinder
	this.newAxis = function(){ 
		var z = rand();
		var theta = Math.random()*Math.PI *2;

		var x= Math.sqrt(1-z*z)*Math.cos(theta);
		var y = Math.sqrt(1-z*z)*Math.sin(theta);
		return new THREE.Vector3(x,y,z);
	};
	this.axis = this.newAxis();



	this.setPosition = function(pos3){
		this.cube.position.x = pos3.x;
		this.cube.position.y = pos3.y;
		this.cube.position.z = pos3.z;
	};

	this.updateCubePos =function()
	{
		this.setPosition(new THREE.Vector3(this.x, this.y, this.z));
	};
	this.updateCubePos();

	//Orbit around axis
	this.rotateAboutWorldAxis = function(angle) {
		  var rotationMatrix = new THREE.Matrix4();
		  rotationMatrix.makeRotationAxis( this.axis.normalize(), angle );
		  var currentPos = new THREE.Vector4(this.cube.position.x, this.cube.position.y, this.cube.position.z, 1);
		  var newPos = currentPos.applyMatrix4(rotationMatrix);
		  this.x  =newPos.x;
		  this.y = newPos.y;
		  this.z = newPos.z;
		  this.updateCubePos();
	}

	//Move towards a direction by an interval determined by the current fps and then duration we want the animation to last
    this.moveTo = function(finalPosition, time,fps)
    {
    	var distanceX =(finalPosition.x -this.x);
		var distanceY =(finalPosition.y -this.y);
		var distanceZ =(finalPosition.z -this.z);
		var updateRate =(1000/fps)/time;

    	
    	if(updateRate>1) //if we have less than a frame update left, fill the remaining gap, should make it more accurate
    	{	
			this.x += distanceX;
			this.y += distanceY;
			this.z += distanceZ;
    	}
    	else
    	{
    		var updateDistanceX = updateRate*distanceX;
    		var updateDistanceY = updateRate*distanceY;
    		var updateDistanceZ = updateRate*distanceZ;
    		
    		this.x += updateDistanceX;
			this.y += updateDistanceY;
			this.z += updateDistanceZ;

    	}
    	 this.updateCubePos();

    	//Fades to targetColor when convering, fades to orginaal color when diverging
    	var oldColor =this.cube.material.color;

		if(finalPosition.x == this.initialPosition.x && finalPosition.y == this.initialPosition.y && finalPosition.z == this.initialPosition.z)
    	{
    		var r = oldColor.r +updateRate *(this.color.r-oldColor.r);
    		var g = oldColor.g +updateRate *(this.color.g-oldColor.g);
    		var b = oldColor.b +updateRate *(this.color.b-oldColor.b);
    	}
    	else
    	{
    		var r = oldColor.r +updateRate *(targetColor["r"]-oldColor.r);
    		var g = oldColor.g +updateRate *(targetColor["g"]-oldColor.g);
    		var b = oldColor.b +updateRate *(targetColor["b"]-oldColor.b);

    	}

		this.cube.material.color.setRGB(r,g,b);
    };

    this.moveBack =function(time,fps)
    {
    	this.moveTo(this.initialPosition, time,fps);
    };


};