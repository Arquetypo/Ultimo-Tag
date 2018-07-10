function Animacion(mat){
	this.material = mat;
	this.frames = 1;
	this.mallas = [];
	this.frame_actual = 0;
	nombre = null;
}
Animacion.prototype.pushMalla = function(frame) {
		console.log("--SIGUENTE FRAME-> --" + this.frames);
		malla = new RecursoMalla(); 
		malla.cargarFichero2(frame,gl);
		this.mallas.push(malla);
		this.frames++;
}
Animacion.prototype.getNombre = function(){
	return this.nombre;
}

Animacion.prototype.draw = function() {
	// console.log('ANIMACION');
	// console.log('ANIMACION');
	// console.log('ANIMACION');
	// console.log('ANIMACION');
	// console.log(this.mallas);
	// console.log('ANIMACION');	
	// console.log('ANIMACION');
	// console.log('ANIMACION');
	// console.log('ANIMACION');
	// console.log('ANIMACION');				
	// if(this.mallas[this.frame_actual%this.frames]!==undefined){
		// console.log(' ##########DIBUJO EL SIGUIENTE FRAME-> '+this.frame_actual);
		this.mallas[this.frame_actual].draw();
		this.frame_actual++;
	// }
	if(this.frame_actual>=this.mallas.length){
		this.frame_actual = 0;
	}
}
// Animacion.prototype.drawImprime = function() {
// 	console.log('--DIBUJANDO FRAME ACTUAL--')
// 	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML +"La animación tiene "+ this.frames + " frames, y este es el frame "+ this.frame_actual%this.frames+ "<br>";
// 	this.mallas[this.frame_actual%this.frames].drawImprime();
	
// 	this.frame_actual++;
// }
Animacion.prototype.endDraw = function() {

}
Animacion.prototype.beginDraw = function() {
	this.material.draw();
	this.draw();
}

Animacion.prototype.getFrame = function() {
	return this.frames;
}
