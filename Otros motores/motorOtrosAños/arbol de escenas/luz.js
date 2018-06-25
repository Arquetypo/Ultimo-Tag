function Luz(amb, dif, esp) {
  this.ambiental = amb;
  this.difusa = dif;
  this.especular = esp;

}

Luz.prototype.setAmbiental= function(amb) {
  this.ambiental = amb;
};

Luz.prototype.getAmbiental = function() {
  return this.ambiental;
};

Luz.prototype.setDifusa= function(dif) {
  this.difusa = amb;
};

Luz.prototype.getDifusa = function() {
  return this.difusa;
};

Luz.prototype.setEspecular= function(esp) {
  this.especular = esp;
};

Luz.prototype.getEspecular = function() {
  return this.especular;
};

Luz.prototype.beginDraw = function() {};

Luz.prototype.endDraw = function() {};
