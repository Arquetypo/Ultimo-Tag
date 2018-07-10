function Transformacion(){
	m=mat4.create();
	mat4.identity(m);
	this.matriz=m;

	cm=mat4.create();
	mat4.identity(cm);
	this.cmatriz=cm;

	this.hola=0;
}

Transformacion.prototype.identidad=function(){
	mat4.identity(this.matriz);
};

Transformacion.prototype.cargar=function(){
	this.matriz=m;
};

Transformacion.prototype.transponer=function() {
	mat4.transpose(this.matriz);
};

Transformacion.prototype.invert=function() {
	// console.log("-----------------------------------");
	// console.log("-----------------------------------");
	// console.log("-----------------------------------");
	// console.log("------------------900909-----------------");
	mat4.inverse(this.matriz);
	mat4.inverse(this.cmatriz);
};

Transformacion.prototype.trasladar=function(x,y,z) {
	mat4.translate(this.matriz, [x,y,z]);
	mat4.translate(this.cmatriz, [x,y,z]);
	mat4.inverse(this.cmatriz);
	if(z !=0){
		this.hola=1;
	// console.log("------------------CREA TRANSALACION-----------------");
	// console.log(this.matriz);
}

	
};

Transformacion.prototype.rotar=function(angulo, x,y,z) {
	mat4.rotate(this.matriz, angulo * Math.PI/180,[x, y, z]);
	mat4.rotate(this.cmatriz, angulo * Math.PI/180,[x, y, z]);
	mat4.inverse(this.cmatriz);
	if(angulo !=0){
		this.hola=2;
	// console.log("------------------CREA ROTACION-----------------");
	// console.log(this.matriz);
}


};

Transformacion.prototype.getMatriz=function(){
	return this.matriz;
};

Transformacion.prototype.escalar=function(x,y,z) {
	mat4.scale(this.matriz, [x,y,z]);
	mat4.scale(this.cmatriz, [x,y,z]);
	mat4.inverse(this.cmatriz);
	// console.log("------------------------------------------ESCAAAAALAAAAAAA");
};

Transformacion.prototype.beginDraw=function(){
	var aux = mat4.create();
	mat4.set(Matriz, aux);
	pila.push(aux);

	mat4.multiply(Matriz, this.matriz);

	gl.uniformMatrix4fv(prg.uMVMatrix, false, Matriz);
	mat4.set(Matriz, nMatrix);
 	mat4.inverse(nMatrix);
 	mat4.transpose(nMatrix);
 	gl.uniformMatrix4fv(prg.uNMatrix, false, nMatrix);

 	// Para la camara

 	var aux1 = mat4.create();
	mat4.set(cMatrix, aux1);
	pilacamara.push(aux1);

 	mat4.multiply(cMatrix, this.cmatriz);


	

	/*mat4.identity(mvMatrix);

	//gl.uniformMatrix4fv(prg.uMVMatrix, false, this.matriz);
	
	mat4.multiply(Matriz, this.matriz);
	gl.uniformMatrix4fv(prg.uMVMatrix, false, mvMatrix);*/

	if(this.hola==1){

	// console.log("------------PILAAA--------------");
	// console.log(pila[0]);
	// console.log(pila[1]);
	// console.log(Matriz);

	// console.log("------------------INTENTA DIBUJAR LA TRASLACION-----------------");

	// console.log(this.matriz);
	//gl.uniformMatrix4fv(prg.uMVMatrix, false, Matriz);

	}

	if(this.hola==2){

	// console.log("------------PILAAA--------------");
	// console.log(pila[0]);



	// console.log("------------------INTENTA DIBUJAR LA ROTACION-----------------");
	// console.log(this.matriz);


	}
};

Transformacion.prototype.endDraw=function(){  
	Matriz=pila.pop();
	cMatrix=pilacamara.pop();

};
