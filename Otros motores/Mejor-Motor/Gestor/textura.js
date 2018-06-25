function Textura(){
	var self = this;
	this.nombre = "";
	this.imagen = new Image();
	this.textura = gl.createTexture();
	this.textureCoordinates = [];
	this.imagen.onload = function(){
		self.handleLoadedTexture();
	}

}
Textura.prototype.getNombre = function() {
	return this.nombre;
};

Textura.prototype.setImagen = function(file){
	this.imagen.src = file;

}
Textura.prototype.setCoordinates = function(coord) {
	this.textureCoordinates = coord;
	this.handleLoadedTexture();
};
Textura.prototype.handleLoadedTexture = function() {

	  gl.bindTexture(gl.TEXTURE_2D, this.textura);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imagen);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	  gl.generateMipmap(gl.TEXTURE_2D);
	  gl.bindTexture(gl.TEXTURE_2D, null);


};