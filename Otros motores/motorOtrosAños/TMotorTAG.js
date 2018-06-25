var gl = null; // WebGL context
var program = null; // shaders
var canvasWidth = 0; // ancho canvas
var canvasHeight = 0; // alto canvas
var cargarModelo =false;

MatrizView = mat4.create();
mat4.identity(MatrizView);
  	
MatrizActual = mat4.create();
mat4.identity(MatrizActual);
pila = [];

function Motor(escena, gestor) {
	this.escena = escena;
	this.gestorRecursos = gestor;
	this.luces = [];
	this.lucesActivas = [];
	this.camaras = [];
	this.camarasActivas = [];
	this.viewport = [];
	this.viewportActivos = [];
	this.pintarLuces = [];
}

Motor.prototype.crearNodo = function(padre,entidad) {
	hijo = padre.addHijo();
	padre.hijos.push(hijo);
	if(entidad!=null)
		hijo.entidad = entidad;
	return hijo;
};

Motor.prototype.crearTransform = function() {
	nodo = new Transformacion();
	return nodo;
};

Motor.prototype.crearCamara = function() {
	nodo = new Camara();
	return nodo;
};

Motor.prototype.crearLuz = function(amb, dif, esp) {
	nodo = new Luz(amb, dif, esp);
	return nodo;
};

Motor.prototype.crearMalla = function(nombre, gl) {
	fichero = this.gestorRecursos.getRecurso(nombre, gl);
	nodo = new Malla();
	nodo.cargarMalla(fichero);
	return nodo;
};

Motor.prototype.crearTexto = function(malla, gl) {
	recurso = new Recurso();
	recurso.setVertices(malla);
	nodo = new Malla();
	nodo.cargarMalla(recurso);
	return nodo;
};

Motor.prototype.registrarLuz = function(nodo){
	this.luces.push(nodo);
	return this.luces.length-1;
};

Motor.prototype.setLuzActiva = function(num){
	this.lucesActivas.length = this.luces.length;
	this.lucesActivas[num] = 1;
};

Motor.prototype.registrarCamara = function(nodo){
	this.camaras.push(nodo);
	return this.camaras.length-1;
};

Motor.prototype.setCamaraActiva = function(num){
	this.camarasActivas.length=this.camaras.length;
	for(var i=0; i<this.camarasActivas.length; i++){
		this.camarasActivas[i] = 0;
	}
	this.camarasActivas[num] = 1;

};

Motor.prototype.registrarViewport = function(x, y, alto, ancho){
	var aux=[x,y,alto,ancho];
	this.viewport.push(aux.slice());
	return this.viewport.length-1;
};

Motor.prototype.setViewportActivo = function(num){
	this.viewportActivos.length=this.viewport.length;
	for(var i=0; i<this.viewportActivos.length; i++){
		this.viewportActivos[i] = 0;
	}

	this.viewportActivos[num] = 1;
};

Motor.prototype.getCamaraActiva = function(){
	for(var i=0; i<this.camarasActivas.length; i++){
		if(this.camarasActivas[i]==1)
			return this.camaras[i];
	}
};

Motor.prototype.getViewportActivo = function(){
	for(var i=0; i<this.viewportActivos.length; i++){
		if(this.viewportActivos[i]==1)
			return this.viewport[i];
	}
};

Motor.prototype.draw = function(){
	mat4.identity(MatrizActual);
    mat4.identity(MatrizView);
	gl.clearColor(0.9, 0.9, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	for(var i=0; i<this.lucesActivas.length; i++){
		if(this.lucesActivas[i]==1){
			var recorrido = [];
			var luz = this.luces[i];
			var amb = luz.getEntidad().getAmbiental();
			var dif = luz.getEntidad().getDifusa();
			var esp = luz.getEntidad().getEspecular();

			gl.uniform3f(program.ambi, amb, amb, amb);
			gl.uniform3f(program.difu, dif, dif, dif);
			gl.uniform3f(program.espec, esp, esp, esp);

			while(luz.getPadre()!=null){
				luz = luz.getPadre();
				recorrido.push(luz);
			}
			recorrido.pop();
			recorrido.reverse();
			var aux =  mat4.create();
		  	mat4.identity(aux);
	  		var matriz = mat4.create();
  			mat4.identity(matriz);
  			for(var j=0; j<recorrido.length; j++){
				matriz = recorrido[j].getEntidad().getMatriz();
				mat4.multiply(aux, matriz);
			}
			this.pintarLuces.push(aux);

			var aux1=[0,0,0,1]
			aux1=mat4.multiply(aux,aux1);

			var aux2=[aux1[0],aux1[1],aux1[2]];
					
			gl.uniform3fv(program.posLuz, aux2);//poner en corrdenadas de camara
		}
	}

	var shininess = 1.0;
	gl.uniform1f(program.shin, shininess);

	var view = this.getViewportActivo();
	gl.viewport(view[0], view[1], view[2], view[3]);

	var camara1 = this.getCamaraActiva();

	var recorrido1 = [];
	while(camara1.getPadre()!=null){
		camara1 = camara1.getPadre();
		recorrido1.push(camara1);
	}
	recorrido1.pop();
	recorrido1.reverse();
	var aux3 =  mat4.create();
  	mat4.identity(aux3);
  	var matriz1 = mat4.create();
  	mat4.identity(matriz1);
	for(var p=0; p<recorrido1.length; p++){
		matriz1 = recorrido1[p].getEntidad().getMatriz();
		mat4.multiply(aux3, matriz1);
	}
	mat4.inverse(MatrizView, aux3);

	MatrizActual = MatrizView.slice();

	mat4.perspective(45, canvasWidth / canvasHeight, 0.1, 1000000.0, MatrizView);
	this.escena.draw();
}