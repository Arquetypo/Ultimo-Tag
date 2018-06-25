function Transformacion(){
	mat = mat4.create();
	mat4.identity(mat);
	this.matrizTrans = mat;
}
Transformacion.prototype.getMatriz = function() {
	return this.matrizTrans;
};
Transformacion.prototype.identidad = function() {

	mat4.identity(this.matrizTrans);

};
Transformacion.prototype.cargar = function(mat) {

	this.matrizTrans = mat; 

};
Transformacion.prototype.transponer = function() {

	mat4.transpose(this.matrizTrans);

};

Transformacion.prototype.trasladar = function(x,y,z) {

	mat4.translate(this.matrizTrans, [x, y, z]);

};

Transformacion.prototype.rotar = function(angulo, x,y,z) {

	mat4.rotate(this.matrizTrans, angulo,[x, y, z]);
	
};
Transformacion.prototype.rotarY = function(elevation) {

    mat4.rotateX(this.matrizTrans, elevation * Math.PI/180);

};
Transformacion.prototype.rotarX = function(azimuth) {

    mat4.rotateY(this.matrizTrans, azimuth * Math.PI/180);
	
};
Transformacion.prototype.escalar = function(x,y,z) {

	mat4.scale(this.matrizTrans, [x, y, z]);

};

Transformacion.prototype.beginDraw = function() {
	aux = mat4.create();
	//guardamos la matriz antes de apilarla
	mat4.set(Matriz, aux);
	//apilamos la matriz con la que estamos trabajando
	pila.push(aux);
	//multiplicamos la matriz de transformación por la actual
	mat4.multiply(Matriz, this.matrizTrans);
};
Transformacion.prototype.endDraw = function() {
	//desapilamos y ponemos la matriz desapilada por la actual
  	Matriz = pila.pop();
};

Transformacion.prototype.beginDrawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<span>Soy una transformación y me imprimo <br> </span>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML +"<span>" + Matriz + "</span><br>";
	
	//ese trabaja con la matriz de transformacion
	
	aux = mat4.create();
	//guardamos la matriz antes de apilarla
	mat4.set(Matriz, aux);
	//apilamos la matriz con la que estamos trabajando
	pila.push(aux);
	//multiplicamos la matriz de transformación por la actual
	mat4.multiply(Matriz, this.matrizTrans);
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML +"<span>" + Matriz + "</span><br>";

};
Transformacion.prototype.endDrawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<span>Soy una transformación y termino de imprimirme <br> </span>";

	//desapilamos y ponemos la matriz desapilada por la actual
  	Matriz = pila.pop();
};