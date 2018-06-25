function Nodo(){
	this.hijos=[];
	this.padre=null;
	this.entidad=null;

}

Nodo.prototype.addHijo=function(){
	var hijo=new Nodo();
	hijo.padre=this;
	this.hijos.push(hijo);

	return hijo
};

Nodo.prototype.addHijo2=function(h){ //Para los hijos ya creados
	h.padre=this;
	this.hijos.push(h);
	return h; //borrar en el caso de que no se necesite
};

Nodo.prototype.removeHijo=function(hijo){
	for(var i=0;i<this.hijos.length;i++){
		if(this.hijos[i]==hijo){
			this.hijos.splice(i, 1);
		}
	}
};

Nodo.prototype.removeHijos=function(){
	this.hijos = [];
};

Nodo.prototype.setEntidad=function(entidad) {
  this.entidad=entidad;
};

Nodo.prototype.getEntidad=function() {
  return this.entidad;
};

Nodo.prototype.getPadre=function(){
	return this.padre; 
};

Nodo.prototype.getHijos=function(){
	return this.hijos; 
};

Nodo.prototype.draw=function() {

  if(this.entidad!=null){
		// console.log("Empezando a dibujar entidad");
		// console.log(this.entidad);
		// console.log("////////////////////");
		this.entidad.beginDraw();
	}

  for(var i=0;i<this.hijos.length;i++){
		// console.log("Dibujando hijo "+i);
		// console.log(this.hijos[i]);
		// console.log("////////////////////");
    this.hijos[i].draw();
  }

  if(this.entidad!=null){
		// console.log("Terminando de dibujar entidad");
		// console.log(this.entidad);
		// console.log("////////////////////");
		this.entidad.endDraw();
	}
  
};