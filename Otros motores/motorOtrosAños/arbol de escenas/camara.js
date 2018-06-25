function Camara() {
  this.perspectiva = true;
  this.matriz = mat4.create();
  mat4.identity(this.matriz);
}

Camara.prototype.setPerspectiva = function(fovy, aspect, cercano, lejano) {
	this.perspectiva = true;
	this.matriz = mat4.perspective(fovy, aspect, cercano, lejano);
};

Camara.prototype.setParalela = function(izda, decha, abajo, arriba, cercano, lejano) {
	this.perspectiva = false;
	this.matriz = mat4.ortho(izda, decha, abajo, arriba, cercano, lejano);
};

Camara.prototype.getMatriz = function() {
  	return this.matriz;
};


Camara.prototype.beginDraw = function() {};

Camara.prototype.endDraw = function() {};