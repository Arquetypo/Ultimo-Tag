
function Transformacion() {
	this.matriz = mat4.create();
	mat4.identity(this.matriz);
}

Transformacion.prototype.identidad = function() {
 	mat4.identity(this.matriz);
};

Transformacion.prototype.cargar = function(mat) {
  	this.matriz = mat;
};

Transformacion.prototype.getMatriz = function() {
  	return this.matriz;
};

Transformacion.prototype.trasponer = function() {
 	mat4.transpose(this.matriz);
};

Transformacion.prototype.trasladar = function(x,y,z) {
	mat4.translate(this.matriz, [x, y, z]);
};

Transformacion.prototype.escalar = function(x,y,z) {
	mat4.scale(this.matriz, [x, y, z]);
};

Transformacion.prototype.rotar = function(angulo,x,y,z) {
	mat4.rotate(this.matriz, angulo, [x, y, z]);
};

Transformacion.prototype.beginDraw = function() {
 	var copy = mat4.create();
    mat4.set(MatrizActual, copy);
	pila.push(copy);
	mat4.multiply(MatrizActual, this.matriz);
};

Transformacion.prototype.endDraw = function() {
	if (pila.length == 0)
        throw "No se puede desapilar la matriz";
    
  	MatrizActual = pila.pop();
};