function Luz(){
	this.emitida = [0.0,0.0,0.0,0.0];
	this.ambiente = [0.0,0.0,0.0,0.0];
	this.especular = [0.0,0.0,0.0,0.0];
	this.difusa = [0.0,0.0,0.0,0.0];
	this.posicion = [0.0,0.0,0.0];

}
Luz.prototype.setEmitida = function(emit) {
	this.emitida = emit;
};
Luz.prototype.getEmitida = function() {
	return this.emitida;
};
Luz.prototype.setAmbiente = function(ambient) {
	this.ambiente = ambient;
};
Luz.prototype.getAmbiente = function() {
	return this.ambiente;
};
Luz.prototype.setEspecular = function(espec) {
	this.especular = espec;
};
Luz.prototype.getEspecular = function() {
	return this.especular;
};
Luz.prototype.setDifusa = function(dif) {
	this.difusa = dif;
};
Luz.prototype.getDifusa = function() {
	return this.difusa;
};
Luz.prototype.setPosicion = function(pos) {
	this.posicion = pos;
};
Luz.prototype.getPosicion = function() {
	return this.posicion;
};
Luz.prototype.beginDraw = function() {

};
Luz.prototype.endDraw = function() {
};