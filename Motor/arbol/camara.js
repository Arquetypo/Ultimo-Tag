function Camara() {
    this.esPerspectiva = true;
    this.cercano = 0;
    this.lejano = 0;
    this.aspecto = 0;
    this.fovy = 0;
    m = mat4.create();
    mat4.identity(m);
    this.matriz = m;
}

Camara.prototype.setPerspectiva = function() {
    this.esPerspectiva = true;
    this.matriz = mat4.perspective(this.fovy, this.aspecto, this.cercano, this.lejano);
};

Camara.prototype.setParalela = function() {
    this.esPerspectiva = false;
    this.matriz = mat4.ortho(-c_width / 145, c_width / 145, -c_height / 145, c_height / 145, -0.0, 10000.0);

};

Camara.prototype.getMatriz = function() {
    return this.matriz;
};

Camara.prototype.setLejano = function(lej) {
    this.lejano = lej;
};
Camara.prototype.setCercano = function(cerc) {
    this.cercano = cerc;
};
Camara.prototype.setFovy = function(fov) {
    this.fovy = fov;
};
Camara.prototype.setAspecto = function(asp) {
    this.aspecto = asp;
};

Camara.prototype.setAtributos = function(fov, asp, cerc, lej) {
    this.aspecto = asp;
    this.lejano = lej;
    this.cercano = cerc;
    this.fovy = fov;
};

Camara.prototype.beginDraw = function() {
    gl.uniformMatrix4fv(prg.uPMatrix, false, this.matriz);
    //mat4.set(Matriz, cMatrix);
    //mat4.inverse(cMatrix);
    gl.uniformMatrix4fv(prg.uMatrixCamara, false, cMatrix);
};

Camara.prototype.endDraw = function() {

};