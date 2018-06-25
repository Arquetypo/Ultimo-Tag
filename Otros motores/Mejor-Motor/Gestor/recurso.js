function Recurso(){
	this.nombre = "";

}
Recurso.prototype.getNombre = function() {
	return this.nombre;
};

Recurso.prototype.setNombre = function(n) {
	this.nombre = n;
};
