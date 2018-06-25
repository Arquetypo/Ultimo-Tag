cargarModelo = false;

function Recurso() {
    this.nombre = null;
    this.vertices = null;
    this.normales = null;
    this.texturas = null;
    this.indices = null;
    this.verTriangulos = null;
    this.norTriangulos = null;
    this.texTriangulos = null;
    this.nTriangulos = null;
}

Recurso.prototype.getNombre = function() {
    return this.nombre;
};

Recurso.prototype.setNombre = function(nombre) {
    this.nombre = nombre;
};
Recurso.prototype.setVertices = function(malla) {
    var aux = [];
    for(var i=0; i<malla.vertices.length; i++){
        aux.push(malla.vertices[i].x);
        aux.push(malla.vertices[i].y);
        aux.push(malla.vertices[i].z);

    }
    this.vertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(aux), gl.STATIC_DRAW);
    console.log(this.vertices)
    this.vertices.itemSize = 3;
    this.vertices.numItems = aux.length / 3;

    aux=[];
    for(var i=0; i<malla.length; i++){
        aux.push(malla.faces[i].a);
        aux.push(malla.faces[i].b);
        aux.push(malla.faces[i].c);

    }
    this.indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(aux), gl.STATIC_DRAW);
    this.indices.itemSize = 1;
    this.indices.numItems = aux.length ;

    cargarModelo=true;

};
Recurso.prototype.cargarFichero = function(nombre, gl) {
    var request = new XMLHttpRequest();
    var yo = this;
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            handleLoadedModel(JSON.parse(request.responseText), yo, gl);
            yo.nombre = nombre;
        }
    }
    request.open("GET", nombre, true);

    request.send(null);
};

function handleLoadedModel(modelData, yo, gl) {

    model = modelData;

    yo.vertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, yo.vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
    yo.vertices.itemSize = 3;
    yo.vertices.numItems = model.vertices.length / 3;

    yo.normales = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, yo.normales);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertexNormals), gl.STATIC_DRAW);
    yo.normales.itemSize = 3;
    yo.normales.numItems = model.vertexNormals.length / 3;

    yo.texturas = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, yo.texturas);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertexTextureCoords), gl.STATIC_DRAW);
    yo.texturas.itemSize = 2;
    yo.texturas.numItems = model.vertexTextureCoords.length / 2;

    yo.indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, yo.indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.indices), gl.STATIC_DRAW);
    yo.indices.itemSize = 1;
    yo.indices.numItems = model.indices.length ;

    cargarModelo=true;
}

function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.uniform1i(program.samplerUniform, 0);
}

var Texture;

Recurso.prototype.draw = function() {

    gl.uniform1i(program.activa, texture == "si");
    if(texture=='si'){
        var nombre = '../js/motor/recursos/material.jpg';
        Texture = gl.createTexture();
        Texture.image = new Image();
        Texture.image.onload = function () {
            handleLoadedTexture(Texture)
        }
        Texture.image.src = nombre;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices);
    gl.vertexAttribPointer(program.VertexPosition, this.vertices.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texturas);
    gl.vertexAttribPointer(program.VertexTexture, this.texturas.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normales);
    gl.vertexAttribPointer(program.VertexNormal, this.normales.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);

    setMatricesUniforms();

    if(cargarModelo == true)
        gl.drawElements(gl.TRIANGLES, this.indices.numItems, gl.UNSIGNED_SHORT,0);
}

function setMatricesUniforms(){
    gl.uniformMatrix4fv(program.pMatrixUniform, false, MatrizView);
    gl.uniformMatrix4fv(program.mvMatrixUniform, false, MatrizActual);

    var normalMatrix = mat3.create();
    mat4.toInverseMat3(MatrizActual, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(program.normalMatrixUniform, false, normalMatrix);
}
