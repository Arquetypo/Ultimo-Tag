function MallaGestor(){
	this.vertices = null;
	this.diffuse = null;
	this.wireframe = null;
	this.vbo = null;
	this.cbo = null;
	this.ibo = null;
	this.indices = null;
	this.nbo = null;
	this.perVertexColor = null;
	this.alias=null;
	this.remote=null;
}
MallaGestor.prototype.getNombre = function(){
	return this.nombreFich;
}
MallaGestor.prototype.cargarFichero = function(fich) { 
		var peticion = new XMLHttpRequest();
		var alias= null;
		var malla = this;
		peticion.open('GET', fich, false);
		peticion.onload = function() {
				object = new OBJ.Mesh(peticion.responseText);
				malla.alias = (alias==null)?'none':alias;
                malla.remote = true;
				malla.vertices=object.vertices;
				malla.indices=object.indices;
				malla.colors=object.colors;
				malla.diffuse = object.diffuse;
				malla.wireframe = object.wireframe;
				malla.perVertexColor = object.perVertexColor;
				if (object.perVertexColor   === undefined)    {   malla.perVertexColor   = false;            }
				if (object.wireframe        === undefined)    {   malla.wireframe        = false;            }
				if (object.diffuse          === undefined)    {   malla.diffuse          = [1.0,1.0,1.0,1.0];}
			
				var vertexBufferObject = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
				
				var normalBufferObject = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Utils.calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
			
				var colorBufferObject;
			
			if (object.perVertexColor){
					colorBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors), gl.STATIC_DRAW);
					object.cbo = colorBufferObject;
				}
			
				var indexBufferObject = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
				console.log(object);
				malla.vbo = vertexBufferObject;
				malla.ibo = indexBufferObject;
				malla.nbo = normalBufferObject;
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
				gl.bindBuffer(gl.ARRAY_BUFFER,null);

				console.log(malla);
				if (malla.remote){
					console.info(malla.alias + ' has been added to the scene [Remote]');
				}
				else {
					console.info(malla.alias + ' has been added to the scene [Local]');
				}
		}
		peticion.send();
}


MallaGestor.prototype.draw = function() {
	var object = this;
	console.log(object);
	gl.viewport(0, 0, c_width, c_height);
        updateTransforms();   
        setMatrixUniforms(); 
/*        for (var i = 0; i < motor.lucesActivas.length; i++){
*/
/*            mat4.translate(transforms.mvMatrix,motor.lucesActivas[i].getPosicion());
			object.diffuse = lucesActivas[i].getDifusa();
*/			
			mat4.translate(mvMatrix,0.0,0.0,0.0);
			object.diffuse = [1.0,0.0,0.0,0.0];
			gl.uniform1i(Program.uLightSource,true);

            transforms.setMatrixUniforms();
            transforms.pop();

/*
            mat4.translate(transforms.mvMatrix,Lights.get(i).position);
			object.diffuse = Lights.get(i).diffuse;
			gl.uniform1i(Program.uLightSource,true);

*/
/*		}
*/
        gl.uniform1i(prg.uUpdateLight,updateLightPosition);  
		gl.uniform1i(prg.uUpdateLight2,updateLightPosition2);            
            
            //Setting uniforms
            gl.uniform4fv(prg.uMaterialDiffuse, object.diffuse);
            gl.uniform1i(prg.uWireframe,object.wireframe);
            gl.uniform1i(prg.uPerVertexColor, object.perVertexColor);
            
            //Setting attributes
            gl.enableVertexAttribArray(prg.aVertexPosition);
            gl.disableVertexAttribArray(prg.aVertexNormal);
           // gl.disableVertexAttribArray(prg.aVertexColor);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.aVertexPosition);
            
            if(!object.wireframe){
                gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
                gl.vertexAttribPointer(prg.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(prg.aVertexNormal);
            }
            
            if (object.perVertexColor){
                gl.bindBuffer(gl.ARRAY_BUFFER, object.cbo);
                gl.vertexAttribPointer(prg.aVertexColor,4,gl.FLOAT, false, 0,0);
                gl.enableVertexAttribArray(prg.aVertexColor);
            }
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);
            
            if (object.wireframe){
                gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            else{
                gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}
MallaGestor.prototype.endDraw = function() {


}


