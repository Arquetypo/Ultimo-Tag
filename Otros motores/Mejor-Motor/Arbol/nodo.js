function Nodo (){
	this.entidad = null;
	this.hijos = [];
	this.padre = null;
}
Nodo.prototype.setEntidad = function(ent) {
	this.entidad = ent;
};
Nodo.prototype.getEntidad = function() {
	return this.entidad;	
};
Nodo.prototype.getPadre = function() {
	return this.padre;
};
Nodo.prototype.addHijo = function() {

	hijo = new Nodo();
	hijo.padre = this;
	this.hijos.push(hijo);
	return hijo; 

};
Nodo.prototype.addHijoCreado = function(hijo) {

	hijo.padre = this;
	this.hijos.push(hijo);
	return hijo; 

};
Nodo.prototype.getHijos = function() {
	return this.hijos;
};
Nodo.prototype.remHijo = function(hijo) {
	pad = hijo.padre;
	hijos = pad.getHijos;
	//lineas adaptadas de StackOverflow por el usuario Tom Wadley en la pregunta https://goo.gl/lfpbXR
	index = array.indexOf(hijo);
	if (index > -1) {
    	array.splice(index, 1);
    //fin de lineas de StackOverflow por Tom Wadley
    	return true;
	}
	else{
		return false;
	}
};
Nodo.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<span>Me imprimo </span> <br>";

	if(this.entidad != null){
		this.entidad.beginDrawImprime();

	}
	if(this.hijos.length>0){

	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<h3>Mando imprimir a mis " + this.hijos.length + " hijos </h3> <br>";

		for(var i = 0; i<this.hijos.length ; i++){
			this.hijos[i].drawImprime();
		}
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<h3>Mis hijos terminaron </h3><br>";
	}

	if(this.entidad != null){

		this.entidad.endDrawImprime();
	}
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<span>Me termino de imprimir </span> <br>";

};

Nodo.prototype.draw = function() {
  if(this.entidad != null)
      this.entidad.beginDraw();

  for(var i=0;i<this.hijos.length;i++){
    this.hijos[i].draw();
  }

  if(this.entidad != null)
    this.entidad.endDraw();
  
};


