function Malla(){
	this.malla = null;
}

Malla.prototype.cargarMalla = function(m) {
	//archivo seria un objeto de tipo malla del gestor de archivos
	mallagestor = new MallaGestor();
	console.log("creo la malla gestor");
	mallagestor.cargarFichero(m);
	console.log("Aqui despues de cargar malla gestior vale:");
	console.log(mallagestor);
	this.malla = mallagestor;
	//comprobar si el archivo ya está cargado en el gestor de archivos
};
Malla.prototype.getMalla = function() {
	return this.malla;
};
Malla.prototype.beginDraw = function() {

	this.malla.draw();
};
Malla.prototype.endDraw = function() {
	//this.malla.endDraw();

};


Malla.prototype.beginDrawImprime = function() {

	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una malla y me imprimo <br>";


};
Malla.prototype.endDrawImprime = function() {
//a implementar en el gestor de recursos
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una malla y termino de imprimirme <br>";

};