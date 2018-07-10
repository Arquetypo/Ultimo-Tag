
//RecursoMalla.prototype = Object.create(Recurso.prototype); //Para la herencia

function RecursoMalla(){

	this.vertices = null;
	this.normales = null;
	this.texturas = null;
	this.indices = null;
    this.squareVertexBuffer = null; 
    this.squareIndexBuffer = null; 
	this.modeloCargado = false;
	this.nombre = null;
    this.archivoTextura = null;
    this.image = null;
}

RecursoMalla.prototype.GetNombre = function(){
	return this.nombre;
}

RecursoMalla.prototype.SetNombre = function (nombre){
	 this.nombre = nombre;
}

// Leemos el fichero de disco pero no con assimp.

RecursoMalla.prototype.cargarFichero = function (nombre, gl, callback){


    var extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();

    if(extension == ".json"){ // COMIENZO DE SI ES JSON

	request = new XMLHttpRequest();

	request.open("GET",nombre,false);


	/*request.onreadystatechange = function() {
        if (request.readyState == 4) {
            cargarModelo(JSON.parse(request.responseText), this, gl);
            
            this.nombre = nombre;
            console.log("EL NOMBRE:"+ this.nombre);
            console.log("Los vertices:"+ this.vertices);
            setTimeout(callback(), 3000);
        
        }
    }*/

	request.send();

	if (request.status == 200){
		cargarModelo(JSON.parse(request.responseText), this, gl);
        this.nombre = nombre;
        callback();
	}

    } // FIN DE SI ES JSON 
    else{ // SI ES UN ARCHIVO.OBJ

        request = new XMLHttpRequest();

        request.open("GET",nombre,false);

        request.send();

        if (request.status == 200){            
            var object = new OBJ.Mesh(request.responseText);
            // console.log(object);
            cargarModelo(object, this, gl);
            this.nombre = nombre;
            callback();                   
    }

        

    }// FIN DEL ELSE
}

RecursoMalla.prototype.cargarFichero2 = function (nombre, gl){


    var extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();



        request = new XMLHttpRequest();

        request.open("GET",nombre,false);

        request.send();

        if (request.status == 200){            
            var object = new OBJ.Mesh(request.responseText);
            // console.log(object);
            cargarModelo(object, this, gl);
            this.nombre = nombre;
            // callback();                
        

    }// FIN DEL ELSE
}

RecursoMalla.prototype.draw = function (){

    /// AQUI SE ENCUENTRA LA PARTE QUE HACE LA TEXTURA, SE INTENTARON FUNCIONES QUE GESTIONASEN DE MANERA
    /// CORRECTA LAS TEXTURAS, PERO NO FUNCIONABA SI NO ERA ASÍ

    if (this.texturas != null) {
    if(this.archivoTextura==null){
         this.archivoTextura = gl.createTexture();
    }

     var image = document.getElementById("holi");

     gl.bindTexture(gl.TEXTURE_2D, this.archivoTextura);
     // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
     //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
     //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
     //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
     //gl.generateMipmap(gl.TEXTURE_2D);
     gl.bindTexture(gl.TEXTURE_2D, null);

 }

    /// AQUI EMPIEZA EL CODIGO DE CARGADO EN BUFFERS


	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
    gl.vertexAttribPointer(prg.aVertexPosition, this.vertices.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.vertexPosition);

    if(this.texturas !=null){

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texturas);
    gl.vertexAttribPointer(prg.aVertexTexture, this.texturas.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.aVertexTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.archivoTextura);

    }

     if(this.normales !=null){

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normales);
    gl.vertexAttribPointer(prg.aVertexNormal, this.normales.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.aVertexNormal);



    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
  



    //if(this.modeloCargado == true)
        gl.drawElements(gl.TRIANGLES, this.indices.numItems, gl.UNSIGNED_SHORT,0);


    ///////////////////////////////////////////////////////////////

        //gl.viewport(0, 0, c_width, c_height);
        //updateTransforms();   
        //setMatrixUniforms(); 

        // Estos métodos se tienen que tener en cuenta posteriormente en el main

        /*
            
            //Setting uniforms
            gl.uniform4fv(prg.uMaterialDiffuse, object.diffuse);
            gl.uniform1i(prg.uWireframe,object.wireframe);
            gl.uniform1i(prg.uPerVertexColor, object.perVertexColor);
            
            //Setting attributes
            gl.enableVertexAttribArray(prg.aVertexPosition);
            gl.disableVertexAttribArray(prg.aVertexNormal);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.aVertexPosition);

            gl.enableVertexAttribArray(prg.aTextureCoord);
            gl.vertexAttribPointer(prg.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
     
            
            if(this.textura!=null && this.textura.length != 0){
                cubeVerticesTextureCoordBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoordinates),gl.STATIC_DRAW);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.textura.textura);
                gl.uniform1i(gl.getUniformLocation(prg, 'uSampler'), 0);
            }


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
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);

            if (object.wireframe){
                gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            else{
                gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);*/
}

RecursoMalla.prototype.setTextura = function(nombre) {

    var image = new Image();

    image.onload = function() {
        this.image = image;
    }

    // console.log(this.image);
    image.src = nombre;

}

function cargarTextura(image, yo){
    
        gl.bindTexture(gl.TEXTURE_2D, yo);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);


}

function cargarModelo(modelo, yo, gl){

	yo.vertices = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, yo.vertices);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelo.vertices), gl.STATIC_DRAW);
    yo.vertices.itemSize = 3;
    yo.vertices.numItems = modelo.vertices.length / 3;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

	yo.normales = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, yo.normales);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelo.vertexNormals), gl.STATIC_DRAW);
    yo.normales.itemSize = 3;
    yo.normales.numItems = modelo.vertexNormals.length / 3;

    if(modelo.textures.length!=0){

    yo.texturas = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, yo.texturas);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelo.textures), gl.STATIC_DRAW);
    yo.texturas.itemSize = 2;
    yo.texturas.numItems = modelo.textures.length / 2;

    }

    yo.indices = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, yo.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelo.indices), gl.STATIC_DRAW);
    yo.indices.itemSize = 1;
    yo.indices.numItems = modelo.indices.length ;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.modeloCargado = true;

    // console.log(this.texturas);
    // console.log(modelo.uvs);



	


}