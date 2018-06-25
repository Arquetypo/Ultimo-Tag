function Motor(){
	this.escena = null;
	this.gestorRecursos = new Gestor();
	//en luces guardo las entidades luces, y en luces activas si están encendidas o apagadas (0 o 1)
	this.luces = [];
	this.lucesActivas = [];
	this.matricesLuces = [];
	//en camaras guardo las entidades camaras, y en camaras activas la camara encendida, el resto estara a 0
	this.cams = [];
	this.camActiva = null;
	this.viewport = [];
	this.viewportActivos = [];
	this.drawSceneHook= undefined;
	this.nodoObjetoPrincipal = null;
}
Motor.prototype.setNodoObjetoPrincipal = function(nod){
	this.nodoObjetoPrincipal = nod;
}
Motor.prototype.getNodoObjetoPrincipal = function(){
	return this.nodoObjetoPrincipal;
}
Motor.prototype.crearEscena = function() {
	//Se crea un nodo escena
	var nodo=new Nodo();
	this.escena=nodo;
	return nodo; 
};
Motor.prototype.crearNodo = function(padre, entidad) {
	//añade un hijo al padre que nos pasan y se le añade la entidad si la tuviera. Devuelve el nodo.
	nodo = padre.addHijo();
	if(entidad != null){
		nodo.setEntidad(entidad);
	}
	return nodo; 
};
Motor.prototype.agregaNodo = function(padre, hijo) {
	//añade un hijo al padre que nos pasan y se le añade la entidad si la tuviera. Devuelve el nodo.
	nodo = padre.addHijoCreado(hijo);
	return nodo; 
};
Motor.prototype.crearTransposicion = function() {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.transponer();
	nodo.setEntidad(trans);
	return nodo;
};
Motor.prototype.crearTranslacion = function(x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.trasladar(x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};
Motor.prototype.crearRotacion = function(angulo, x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.rotar(angulo,x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};

Motor.prototype.crearEscalado = function(x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.escalar(x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};

Motor.prototype.crearCamara = function() {
	//crea un nodo y le añade una entidad camara. Devuelve el nodo.
	nodo = new Nodo();
	cam = new Camara(); 
	nodo.setEntidad(cam);
	return nodo;
};
Motor.prototype.crearLuz = function() {
	//crea un nodo y le añade una entidad luz. Devuelve el nodo.
	nodo = new Nodo();
	luz = new Luz(); 
	nodo.setEntidad(luz);
	return nodo;
};
Motor.prototype.crearMalla = function(nombre) {
	//crea un nodo y le añade una entidad malla. Devuelve el nodo.
	// console.log("Crear malla de motor");
	nodo = new Nodo();
	malla = new Malla(); 
	malla.cargarMalla(nombre);
	// console.log("CREANDO MALLA EN MOTOR");
	// console.log(malla);
	nodo.setEntidad(malla);
	return nodo;
};
Motor.prototype.crearAnimacion = function(nombre, frame) {
	//crea un nodo y le añade una entidad malla. Devuelve el nodo.
	// console.log("Crear malla de motor");
	animacion = this.gestorRecursos.pushAnimacion(nombre, frame)
	// console.log("CREANDO MALLA EN MOTOR");
	// console.log(malla);
	return animacion;
};

Motor.prototype.agregaLuz = function(l) {
/*	console.log("luces antes vale:");
	console.log(this.luces);
	console.log("Inserto la luz:");
	console.log(l);
*/	this.luces.push(l);
	this.lucesActivas.push(0); //por defecto apagada
	this.matricesLuces.push(null);
/*	console.log("luces despues vale:");
	console.log(this.luces);
	console.log("Y el array mide:");
	console.log(this.luces.length);
*/};
Motor.prototype.setLuzActiva = function(cam) {
/*	console.log("lucesActiva.lenght activas antes vale:");
	console.log(this.lucesActivas.length);
	console.log("luces.lenght antes vale:");
	console.log(this.luces.length);
*/	this.lucesActivas[cam] = 1;
/*	console.log("luces activas despues vale:");
	console.log(this.lucesActivas);
	console.log("luces despues vale:");
	console.log(this.luces);
*/};
Motor.prototype.apagarLuzActiva = function(cam) {
/*	console.log("lucesActiva.lenght activas antes vale:");
	console.log(this.lucesActivas.length);
	console.log("luces.lenght antes vale:");
	console.log(this.luces.length);
*/	this.lucesActivas[cam] = 0;
	console.log(this.lucesActivas);
/*	console.log("luces activas despues vale:");
	console.log(this.lucesActivas);
	console.log("luces despues vale:");
	console.log(this.luces);
*/};
Motor.prototype.agregaCam = function(l) {
	this.cams.push(l);
	return this.cams.length;
};
Motor.prototype.setCamActiva = function(cam) {
	camActiva=cam;
};
Motor.prototype.checkLuzActiva = function(l){
	if(this.lucesActivas[l] == 1){
		return true;
	}
	else{
		return false;
	}
}
Motor.prototype.getLucesActivasPos = function() {
	array = [];
/*	console.log(this.lucesActivas);
	console.log(this.luces);
*/	for(i=0; i<this.lucesActivas.length; i++){
		if(this.lucesActivas[i] == 1)
		{
			for(j=0 ; j<3; j++){
				// i] - 1 porque luces empieza en 1 
				array.push(this.luces[i].getEntidad().getPosicion()[j]);
			}
		}
	}
/*	console.log(array);
*/	return array; 
};
Motor.prototype.getLucesActivasDif = function() {
	array = [];
/*	console.log(this.lucesActivas);
	console.log(this.luces);
*/	for(i=0; i<this.lucesActivas.length; i++){
		if(this.lucesActivas[i] == 1)
		{
			for(j=0 ; j<4; j++){
				// i] - 1 porque luces empieza en 1 
				array.push(this.luces[i].getEntidad().getDifusa()[j]);
			}
		}
	}
/*	console.log(array);
*/	return array; 
};
Motor.prototype.drawInitProgram = function() {
    gl = Utils.getGLContext("canvas-element-id");
    if(debug == true){
    	ctx = WebGLDebugUtils.makeDebugContext(Utils.getGLContext("canvas-element-id"));
    	gl = WebGLDebugUtils.makeDebugContext(gl, undefined, logGLCall);

    }
	var useVertexColors = false;
	var texture = null;

	var attributeList = ["aVertexPosition",
					"aVertexNormal",
					"aVertexColor",
					"aVertexTextureCoords"];

	var uniformList = [	"uPMatrix", 
					"uMVMatrix", 
					"uNMatrix",
					"uMaterialDiffuse",
					"uMaterialAmbient",
					"uLightAmbient",
					"uLightDiffuse",
					"uLightPosition",
					"uWireframe",
					"uAlpha",
					"uLightSource",
					"uUseVertexColor",
					"uUseLambert",
					"uCutOff",
					"uSampler",
					];

/*	console.log("Luces" +this.getLucesActivasPos());	
*/
    Program.load(attributeList, uniformList);
/*    console.log(this.luces);
*/
	gl.uniform4fv(Program.uLightAmbient ,  [0.0,0.0,1.0,1.0]);

/*	console.log(this.getLucesActivasPos());
	console.log(this.getLucesActivasDif());

*/	
	gl.uniform3fv(Program.uLightPosition, this.getLucesActivasPos());
	gl.uniform4fv(Program.uLightDiffuse,  this.getLucesActivasDif());

/*	gl.uniform3fv(Program.uLightPosition, this.luces[0].getEntidad().getPosicion());
	gl.uniform4fv(Program.uLightDiffuse,  this.luces[0].getEntidad().getDifusa());
*/	


	//texturas
	gl.uniform1f(Program.uAlpha, 1.0);
	gl.uniform1i(Program.uUseVertexColor, useVertexColors);
	gl.uniform1i(Program.uUseLambert, true);



	gl.uniform1f(Program.uCutOff, 0.4);	


	gl.clearColor(0.3,0.3,0.3, 1.0);
    gl.clearDepth(100.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
	//Initialize Model-View matrix
    mat4.identity(mvMatrix);    
    //Initialize Camera matrix as the inverse of the Model-View Matrix
    mat4.identity(cMatrix);
    mat4.inverse(mvMatrix,cMatrix);
    
    //Initialize Perspective matrix
    mat4.identity(pMatrix);
        
    //Initialize Normal matrix
    mat4.identity(nMatrix);
    mat4.set(mvMatrix, nMatrix);
    mat4.inverse(nMatrix);
    mat4.transpose(nMatrix);
    coords = COORDS_WORLD;
}
Motor.prototype.initViewMatrix = function() {

	// console.log("init view matrix");
	var camara = this.cams[camActiva];
	var recorridocamara = [];
	while(camara.getPadre()!=null){
		camara = camara.getPadre();
		recorridocamara.push(camara);
	}
	recorridocamara.pop();
	recorridocamara.reverse();
	var maux =  mat4.create();
	mat4.identity(maux);
	var matriz = mat4.create();
	mat4.identity(matriz);
	// console.log("Voy a recorrer el array y multiplicar sus matrices");
	for(var p=0; p<recorridocamara.length; p++){
		// console.log("Interaccion numero:");
		// console.log(p);
		// console.log(recorridocamara[p].getEntidad());
		matriz = recorridocamara[p].getEntidad().getMatriz();
		// console.log("El valor de matriz es :");
		// console.log(matriz);
		mat4.multiply(maux, matriz);
		// console.log("El valor de maux en este momento es :");
		// console.log(maux);
	}
	mat4.inverse(maux, mvMatrix );
	// console.log(mvMatrix);
};

Motor.prototype.initLights = function() {

		//console.log("Recorro el array de luces activas para ver cual esta activa");
		console.log(this.lucesActivas);
		for(var i=0; i<this.lucesActivas.length; i++){
		console.log("En la iteraccion "+i);
		if(this.lucesActivas[i]==1){
			//console.log("Luz activa");
			var recorrido = [];
			var luz = this.luces[i];
			//console.log("luz vale: ");
			//console.log(luz);
			while(luz.getPadre()!=null){
				//console.log("Asciendo al padre y guardo el nodo en recorrido")
				//console.log(luz.getPadre());
				luz = luz.getPadre();
				recorrido.push(luz);
			}
			recorrido.pop();
			recorrido.reverse();
			var aux =  mat4.create();
		  	mat4.identity(aux);
	  		var matriz = mat4.create();
  			mat4.identity(matriz);
			//console.log("Recorro el array de tranformaciones");
  			for(var j=0; j<recorrido.length; j++){
				//console.log("tranformacion numero:"+j);
				//console.log(recorrido[j].getEntidad());
				matriz = recorrido[j].getEntidad().getMatriz();

				//console.log("Multiplico "+matriz+" por "+aux);
				mat4.multiply(aux, matriz);
				//console.log("matriz vale: ");
				//console.log(matriz);
				//console.log("aux vale: ");
				//console.log(aux);
			  }
			this.matricesLuces[i]=matriz;
			//console.log("MAtrix de luz vale: ");
			//console.log(matriz);
			LuzMatrix=matriz;
			//console.log(LuzMatrix);
			}else{
				//console.log("Luz apagada");
			}
	}
	//console.log(this.matricesLuces);
};
Motor.prototype.draw = function() {
	//pasos para crear el motor
	console.log("entro a init light");
	this.initLights();
	//paso 1 cargar librería gráfica
	this.drawInitProgram();
	//paso 4 inicializar la camara
	//calcular la matriz de view
	// console.log(mvMatrix);
	this.initViewMatrix();
	// console.log(mvMatrix);
	//paso2 incializar las luces
	//paso 3 incializar el viewport
	//paso 5 > DRAW
	var aux=this.escena;
	var self = this;
	this.drawSceneHook  = function(){
        aux.draw();
        self.initViewMatrix();
 	}
	WEBGLAPP_RENDER = this.drawSceneHook;
	renderLoop();
	//mandamos el arbol a dibujar
};