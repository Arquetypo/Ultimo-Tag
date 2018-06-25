function Malla() {
	this.malla = null;
	this.material= null;
}

Malla.prototype.cargarMalla=function(model, mat){
	this.malla = model;
	this.material = mat;
};

Malla.prototype.getMalla=function(){
	return this.malla;
};

Malla.prototype.beginDraw=function(){
	console.log("////////////////");
	console.log("BEGIN DRAW MALLA");
	console.log("////////////////");
	console.log("hahhhhhhhhh"+ this.material.getNombre());
	this.material.draw();
	this.malla.draw();
};

Malla.prototype.endDraw=function(){
	
};