function Rejilla() {
  this.vertices = [];
	this.bufferVertices = [];
}

Rejilla.prototype.cargarVertices = function(x,y,z) {
  	this.vertices.push(x);
	this.vertices.push(y);
	this.vertices.push(z);
};

Rejilla.prototype.getVertices = function() {
	return this.vertices;
};

Rejilla.prototype.beginDraw = function() {
	this.bufferVertices = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	this.bufferVertices.itemSize = 3;
	this.bufferVertices.numItems = this.vertices.length / 3;
	texture='no';
	gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
	gl.vertexAttribPointer(program.VertexPosition, this.bufferVertices.itemSize, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(program.pMatrixUniform, false, MatrizView);
	gl.uniformMatrix4fv(program.mvMatrixUniform, false, MatrizActual);

	var normalMatrix = mat3.create();
	mat4.toInverseMat3(MatrizActual, normalMatrix);
	mat3.transpose(normalMatrix);
	gl.uniformMatrix3fv(program.normalMatrixUniform, false, normalMatrix);

	gl.drawArrays(gl.LINES, 0, this.bufferVertices.numItems);


};

Rejilla.prototype.endDraw = function() {};