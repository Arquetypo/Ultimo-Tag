function Malla() {
  this.malla = null;
}

Malla.prototype.cargarMalla = function(fichero) {
  this.malla = fichero;
};

Malla.prototype.getMalla = function() {
	return this.malla;
};

Malla.prototype.beginDraw = function() {
	if(this.malla.getNombre()!=null){
		this.malla.draw();
	}
};

Malla.prototype.endDraw = function() {};