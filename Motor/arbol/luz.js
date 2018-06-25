function Luz(){
    this.posicion=null;
    this.difusa=null;
    this.ambiente=null;
	this.emitida=null;
	this.especular=null;
}


Luz.prototype.setPosicion = function(p) {
	this.posicion=p;
};
Luz.prototype.getPosicion = function() {
	return this.posicion;
};
Luz.prototype.setDifusa = function(d) {
	this.difusa=d;
};
Luz.prototype.getDifusa = function() {
	return this.difusa;
};
Luz.prototype.setAmbiente = function(a) {
	this.ambiente=a;
};
Luz.prototype.getAmbiente = function() {
	return this.ambiente;
};
Luz.prototype.setEmitida = function(e) {
	this.emitida=e;
};
Luz.prototype.getEmitida = function() {
	return this.emitida;
};
Luz.prototype.setEspecular = function(e) {
	this.especular=e;
};
Luz.prototype.getEspecular = function() {
	return this.especular;
};
Luz.prototype.beginDraw = function() {
	

};
Luz.prototype.endDraw = function() {
};