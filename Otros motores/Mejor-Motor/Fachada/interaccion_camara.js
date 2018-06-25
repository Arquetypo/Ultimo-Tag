function CameraInteractor(rot, tras,canvas){
    
    this.rot = rot; //le tenemos que pasar el rot de transformacíon de la camara
    this.tras = tras; //le tenemos que pasar el rot de transformacíon de la camara

    this.canvas = canvas;    
    this.update();
    this.dragging = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.button = 0;
    this.ctrl = false;
    this.key = 0;
    
    this.MOTION_FACTOR = 10.0;
    this.dloc = 0;
    
}

CameraInteractor.prototype.onMouseUp = function(ev){
    this.dragging = false;
}
CameraInteractor.prototype.onMouseDown = function(ev){
    this.dragging = true;
    this.x = ev.clientX;
    this.y = ev.clientY;
    this.button = ev.button;
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
        if(this.ctrl){
            this.dolly(dy);
        }
        else{ 
            this.rotate(dx,dy);
        }
    }
}
CameraInteractor.prototype.onKeyUp = function (e){
   var key = e.keyCode ? e.keyCode : e.which;
   if(key == 38){
    //arriba
    console.log("arriba");
    this.z+=4;
    this.tras.getEntidad().trasladar(0, 0, this.z)
   }
   else if (key == 40){
    //abajo
    this.z-=4;
    this.tras.getEntidad().trasladar(0, 0, this.z)

   }
}
CameraInteractor.prototype.rotate = function(dx, dy){
    
    
    var camera = this.camera;
    var canvas = this.canvas;
    
    var delta_elevation = -20.0 / canvas.height;
    var delta_azimuth   = -20.0 / canvas.width;
                
    var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
    var nElevation = dy * delta_elevation * this.MOTION_FACTOR;
    
/*    camera.changeAzimuth(nAzimuth);
    camera.changeElevation(nElevation);
*/
    this.rot.getEntidad().rotarX(nAzimuth);
    this.rot.getEntidad().rotarY(nElevation);
/*    console.log(this.rot.getEntidad().getMatriz())
*/
}

CameraInteractor.prototype.update = function(){
    var self = this;
    var canvas = this.canvas;
    

    canvas.onmousedown = function(ev) {
        self.onMouseDown(ev);
    }

    canvas.onmouseup = function(ev) {
        self.onMouseUp(ev);
    }
    
    canvas.onmousemove = function(ev) {
        self.onMouseMove(ev);
    }
    
    window.onkeydown = function(ev){
/*        self.onKeyDown(ev);
*/    
        console.log("Metodo a implementar");
    }
    
    window.onkeyup = function(ev){
        self.onKeyUp(ev);
    }
}
