
function CameraInteractor(camera,canvas){
    
    this.camera = camera;
    this.canvas = canvas;
    this.update();
    
    this.dragging = false;
    this.picking = false;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.button = 0;
    this.ctrl = false;
    this.key = 0;
    
    this.MOTION_FACTOR = 10.0;
    this.dloc = 0;
    this.dstep = 0;
	
	this.picker = null;
    
}


CameraInteractor.prototype.onMouseDown = function(ev){
    this.dragging = true;
    this.x = ev.clientX;
	this.y = ev.clientY;
	console.log('this.x : ' + this.x);
	console.log('this.y : ' + this.y);

	this.button = ev.button;
	this.dstep = Math.max(this.camera.position[0],this.camera.position[1],this.camera.position[2])/100;
   
}

CameraInteractor.prototype.onMouseMove = function(ev){
	this.lastX = this.x;
	this.lastY = this.y;
	this.x = ev.clientX;
    this.y = ev.clientY;
	
	if (!this.dragging) return;
		

	this.ctrl = ev.ctrlKey;
	this.alt = ev.altKey;
	var dx = this.x - this.lastX;
	var dy = this.y - this.lastY;
	
	if (this.button == 0) { 
		if(this.alt){
			this.dolly(dy);
		}
		else{ 
			this.rotate(dx,dy);
		}
	}
}




CameraInteractor.prototype.update = function(){
    var self = this;
	var canvas = this.canvas;
	

	canvas.onmousedown = function(ev) {
		console.log("Hola aqui con onmousedown "+ev);
		self.onMouseDown(ev);
    }
	
	canvas.onmousemove = function(ev) {
		self.onMouseMove(ev);
    }
	
	
}


CameraInteractor.prototype.rotate = function(dx, dy){
	
	var camera = this.camera;
	var canvas = this.canvas;

	console.log("aqui con la cam"+camera+"y con el canvas");
	
	var delta_elevation = -20.0 / canvas.height;
	var delta_azimuth   = -20.0 / canvas.width;
				
	var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
	var nElevation = dy * delta_elevation * this.MOTION_FACTOR;
	
	camera.changeAzimuth(nAzimuth);
	camera.changeElevation(nElevation);
}