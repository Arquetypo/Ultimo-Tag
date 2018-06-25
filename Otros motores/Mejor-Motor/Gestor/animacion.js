function Animacion(){
	this.frames = 0;
	this.mallas = [];
	this.frame_actual = 0;
	nombre = null;
}
Animacion.prototype.pushMalla = function(mesh_frame, tex) {
		console.log("meto el siguiente frame de la animación " + this.frames)
		malla = new MallaGestor(); 
		malla.cargarFichero(mesh_frame)
		if(tex != null){
			malla.setTextura(tex);
		}
		this.mallas.push(malla);
		this.frames++;
};
Animacion.prototype.getNombre = function(){
	return this.nombre;
};

Animacion.prototype.draw = function() {
	//console.log('Dibujo el frame actual modulo frames')
	this.mallas[this.frame_actual%this.frames].draw();
	this.frame_actual++;
};
Animacion.prototype.drawImprime = function() {
	console.log('Dibujo el frame actual modulo frames')
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML +"La animación tiene "+ this.frames + " frames, y este es el frame "+ this.frame_actual%this.frames+ "<br>";
	this.mallas[this.frame_actual%this.frames].drawImprime();
	
	this.frame_actual++;
}
Animacion.prototype.endDraw = function() {

};
Animacion.prototype.beginDraw = function() {
	this.draw();
};


