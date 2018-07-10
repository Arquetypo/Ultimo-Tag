function Material(nombre) {

	this.nombre = nombre;
	this.ambient = [];
	this.diffuse = [];
	this.specular = [];
	this.shiness = null;
}


Material.prototype.getNombre=function(){
	return(this.nombre);
};

Material.prototype.setName=function(name){
	this.name=name;
};

Material.prototype.getAmbient=function(){
	return(this.ambient);
};

Material.prototype.getdiffuse=function(){
	return(this.diffuse);
};

Material.prototype.getSpecular=function(){
	return(this.specular);
};

Material.prototype.getShiness=function(){
	return(this.shiness);
};

Material.prototype.cargarMat = function (){

	var nombre = this.nombre;
    console.log(nombre);

    var extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();

    if(extension == ".json"){ // COMIENZO DE SI ES JSON

	request = new XMLHttpRequest();

	request.open("GET",nombre,false);


	request.send();

	if (request.status == 200){
		cargarMaterial(JSON.parse(request.responseText), this, gl);
        
	}

    } // FIN DE SI ES JSON 
    else{ // SI ES UN ARCHIVO.OBJ

        request = new XMLHttpRequest();

        request.open("GET",nombre,false);

        request.send();

        if (request.status == 200){
        var object = new OBJ.Mesh(request.responseText);
                    // console.log(object);
    }

        

    }// FIN DEL ELSE
}

function cargarMaterial(modelo,yo,gl){

	yo.shiness = modelo.shiness;

    for(var i=0; i<modelo.diffuse.length; i++){
        yo.diffuse.push(modelo.diffuse[i]);
    };

    for(var i=0; i<modelo.ambient.length; i++){
        yo.ambient.push(modelo.ambient[i]);
    };

    for(var i=0; i<modelo.specular.length; i++){
        yo.specular.push(modelo.specular[i]);
    };





}

Material.prototype.draw = function (){

 	gl.uniform1f(prg.shininessVal, this.shiness); 
    gl.uniform3fv(prg.ambientColor, this.ambient);
    gl.uniform3fv(prg.diffuseColor, this.diffuse);
    gl.uniform3fv(prg.specularColor, this.specular);

}