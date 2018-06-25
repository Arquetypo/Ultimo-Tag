

function Recurso(){

this.nombre = null;
this.contenido = "";


}



Recurso.prototype.GetNombre = function(){
	return this.nombre;
}

Recurso.prototype.SetNombre = function(nombre){
	 this.nombre = nombre;
}

Recurso.prototype.GetContenido = function(){
	return this.contenido;
}




