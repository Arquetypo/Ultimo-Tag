function Gestor() {
  this.recursos = [];
}

Gestor.prototype.getRecurso = function(nombre, gl) {

	recurso = null;

	for(i=0;i<this.recursos.length;i++){
		if(this.recursos[i].getNombre() == nombre){
			recurso = this.recursos[i];
			auxRecurso = recurso;
			break;
		}
	}

	if(recurso == null){
		recurso = new Recurso();
		recurso.cargarFichero(nombre, gl);
		this.recursos.push(recurso);
	}
	return recurso;
};
