


function RecursoTextura(){

    var self = this;
	this.nombre = null;
	this.textura = gl.createTexture();
    this.imagen = new Image();
    this.imagen.onload = function(){
        self.cargarTextura();
    }

	


}

RecursoTextura.prototype.GetNombre = function(){
	return this.nombre;
}

RecursoTextura.prototype.SetNombre = function (nombre){
	 this.nombre = nombre;
}

RecursoTextura.prototype.SetNombre = function (nombre){
     this.nombre = nombre;
}

RecursoTextura.prototype.cargarFichero = function (nombre, gl, callback){
     
    this.imagen.src = nombre;


}

RecursoTextura.prototype.cargarTextura = function() {

      gl.bindTexture(gl.TEXTURE_2D, this.textura);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imagen);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);



}

