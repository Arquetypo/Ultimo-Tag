function GestorRecursos() {
    this.recursos = [];
}


GestorRecursos.prototype.getRecurso = function(nombre, gl) {

    recurso = null;
    recursos = this.recursos;

    for (i = 0; i < this.recursos.length; i++) {

        if (recursos[i] != null) {
            if (recursos[i].GetNombre() == nombre) {
                // console.log("YA EXISTE"+ recursos[i].nombre);
                recurso = recursos[i];
                break;
            }
        }
    }

    if (recurso == null) {
        recurso = this.tipoObjeto(nombre);
        if (recurso != null) {
            recurso.cargarFichero(nombre, gl, function() {
                // console.log("Hace el push");
                this.recursos.push(recurso);
            });
        }
    }
 

    return recurso;
}



GestorRecursos.prototype.tipoObjeto = function(nombre) {


    var recurso = null;
    var extension = null;

    request = new XMLHttpRequest();


    request.open("HEAD", nombre, false);
    request.send();



    if (request.status == 200) { //Si el archivo existe en el servidor entonces depende de la extension crea un tipo de recurso u otro


        extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();


        if (extension == ".jpg" || extension == ".jpeg" || extension == ".png") {
            recurso = new RecursoTextura();
        }

        if (extension == ".json" || extension == ".obj") {
            recurso = new RecursoMalla();
        }

    }


    return recurso;

}


GestorRecursos.prototype.setRecursoPrueba = function() {

    recurso = new Recurso();
    recurso.SetNombre("Recursillo");
    this.recursos.push(recurso);


}