function Nodo() {
  this.entidad = null;
  this.hijos = [];
  this.padre = null;
}

Nodo.prototype.addHijo = function() {
  hijo = new Nodo();
  hijo.padre = this;
  return hijo;
};

Nodo.prototype.removeHijos = function() {
  this.hijos = [];
};

Nodo.prototype.removeHijo = function(hijo) {
  padre=hijo.getPadre();
  hijos=padre.getHijos();
  for(i=0;i<hijos.length;i++){
    if (hijos[i] === hijo){
      hijos.splice(i,1);
    }
  }
};

Nodo.prototype.setEntidad = function(entidad) {
  this.entidad=entidad;
};

Nodo.prototype.getEntidad = function() {
  return this.entidad;
};

Nodo.prototype.getPadre = function() {
  return this.padre;
};

Nodo.prototype.getHijos = function() {
  return this.hijos;
};

Nodo.prototype.draw = function() {
  if(this.entidad != null)
      this.entidad.beginDraw();

  for(var i=0;i<this.hijos.length;i++){
    this.hijos[i].draw();
  }

  if(this.entidad != null)
    this.entidad.endDraw();
  
};