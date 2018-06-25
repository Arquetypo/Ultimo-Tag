function Camara(){
	mat = mat4.create();
	this.esPerspectiva = true;
	this.matriz = mat;
	cercano = 0;
	lejano = 0;
	aspecto = 0;
	fovy = 0;
}
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
Camara.prototype.setAll = function(lej, cerc, fov, asp) {
	this.aspecto = asp;
	this.lejano = lej;
	this.cercano = cerc;
	this.fovy = fov;

};

Camara.prototype.getMatriz = function() {
  	return this.matriz;
};
Camara.prototype.setPerspectiva = function() {
	this.esPerspectiva = true;
	this.matriz = mat4.perspective(this.fovy, this.aspecto, this.cercano, this.lejano)
};
Camara.prototype.setParalela = function() {
	this.esPerspectiva = true;
	this.matriz = mat4.ortho(this.fovy, this.aspecto, this.cercano, this.lejano)
};


Camara.prototype.beginDraw = function() {

};

Camara.prototype.endDraw = function() {

};