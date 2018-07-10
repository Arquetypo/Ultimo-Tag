/**
*   Camera
*/

var CAMERA_ORBITING_TYPE = 1;
var CAMERA_TRACKING_TYPE = 2;


function Camara() {
    var t=1;
    this.esPerspectiva = true;
    this.cercano = 0;
    this.lejano = 0;
    this.aspecto = 0;
    this.fovy = 0;
    this.azimuth    = 0.0;
    this.elevation  = 0.0;
    m = mat4.create();
    mat4.identity(m);
    this.matriz = m;

    this.mvMatrix = mat4.create();

    //this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.azimuth    = 0.0;
    this.elevation  = 0.0;
    this.type       = t;
    this.steps      = 0;
    
    this.home = vec3.create();
      
    this.hookRenderer = null;
    this.hookGUIUpdate = null;

}

Camara.prototype.setPerspectiva = function() {
    this.esPerspectiva = true;
    this.matriz = mat4.perspective(this.fovy, this.aspecto, this.cercano, this.lejano);
};

Camara.prototype.setParalela = function() {
    this.esPerspectiva = false;
    this.matriz = mat4.ortho(-c_width / 145, c_width / 145, -c_height / 145, c_height / 145, -0.0, 10000.0);

};

Camara.prototype.getMatriz = function() {
    return this.matriz;
};

Camara.prototype.setLejano = function(lej) {
    this.lejano = lej;
};
Camara.prototype.setCercano = function(cerc) {
    this.cercano = cerc;
};
Camara.prototype.setFovy = function(fov) {
    this.fovy = fov;
};
Camara.prototype.setAspecto = function(asp) {
    this.aspecto = asp;
};

Camara.prototype.setAtributos = function(fov, asp, cerc, lej) {
    this.aspecto = asp;
    this.lejano = lej;
    this.cercano = cerc;
    this.fovy = fov;
};

Camara.prototype.beginDraw = function() {

    gl.uniformMatrix4fv(prg.uPMatrix, false, this.matriz);

    gl.uniformMatrix4fv(prg.uMatrixCamara, false, cMatrix);
};

Camara.prototype.endDraw = function() {

};

Camara.prototype.goHome = function(h){
    if (h != null){
        this.home = h;
    }
    
    //this.setPosition([0,0,0]);
   console.log("chechche"+ this.position);
    
    
}


Camara.prototype.setPosition = function(p){
    vec3.set(p, this.position);
    this.update();
}


Camara.prototype.setAzimuth = function(az){
    this.changeAzimuth(az - this.azimuth);
}

Camara.prototype.changeAzimuth = function(az){
    var c = this;
    c.azimuth +=az;
    
    if (c.azimuth > 360 || c.azimuth <-360) {
        c.azimuth = c.azimuth % 360;
    }
    c.update();
}

Camara.prototype.setElevation = function(el){
    this.changeElevation(el - this.elevation);
}

Camara.prototype.changeElevation = function(el){
    var c = this;
    
    c.elevation +=el;
    
    if (c.elevation > 360 || c.elevation <-360) {
        c.elevation = c.elevation % 360;
    }
    c.update();
}

Camara.prototype.update = function(){
    mat4.identity(this.matriz);
    
   
    
    if (this.type == CAMERA_TRACKING_TYPE){
        console.log('this.type == CAMERA_TRACKING_TYPE')
        mat4.translate(this.matriz, this.position);
        mat4.rotateY(this.matriz, this.azimuth * Math.PI/180);
        mat4.rotateX(this.matriz, this.elevation * Math.PI/180);
    }
    else {
        console.log('NO this.type == CAMERA_TRACKING_TYPE')
        var trxLook = mat4.create();
        this.position = [0,0,0];
        mat4.rotateY(this.matriz, this.azimuth * Math.PI/180);
        mat4.rotateX(this.matriz, this.elevation * Math.PI/180);
        mat4.translate(this.matriz,this.position);
        console.log("loco, loco"+this.position);
    }

  
  
    if(this.type == CAMERA_TRACKING_TYPE){
        mat4.multiplyVec4(this.matriz, [0, 0, 0, 1], this.position);
    }
    
    if(this.hookRenderer){
        this.hookRenderer();
    }
    if(this.hookGUIUpdate){
        this.hookGUIUpdate();
    }
    
}

Camara.prototype.getViewTransform = function(){
    var m = mat4.create();
    mat4.inverse(this.matriz, m);
    return m;
}

