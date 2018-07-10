function Motor(){
    this.escena=null;
    this.gestorRecursos=new GestorRecursos(); 
    this.luz= [];
    this.camara=null;  
}

Motor.prototype.crearNodo=function(padre, entidad) {
    nodo = padre.addHijo();
    if(entidad != null){
        nodo.setEntidad(entidad);
    }
    return nodo; 
};

Motor.prototype.crearTransform=function(){
    var trans=new Transformacion();
    return trans;
};


Motor.prototype.enseLuces=function(){
    // console.log("LAAAAASSSSS LUCEEEEEEESSSS");
    // console.log(this.luz);
};

Motor.prototype.crearCamara=function(){
    var cam=new Camara();
    return cam;
};


Motor.prototype.crearLuz=function(p,d,a,em,es){
    // creamos la luz
    var luz =new Luz();
    // Rellenamos sus valores
    luz.setPosicion(p);
    luz.setDifusa(d);
    luz.setAmbiente(a);
    luz.setEmitida(em);
    luz.setEspecular(es);
    // La almacenamos con las luces

    var nodo = new Nodo();
    nodo.setEntidad(luz);
    this.luz.push(luz);

    return nodo;
};

Motor.prototype.crearMalla=function(name, material){
    var model=this.gestorRecursos.getRecurso(name,gl);
    var mat=new Material(material);
    mat.cargarMat();
    var nodo = new Nodo();
    var malla = new Malla(); 
    malla.cargarMalla(model, mat);
    nodo.setEntidad(malla);
    return nodo;
};

Motor.prototype.crearAnimacion=function(material){
    var mat=new Material(material);
    mat.cargarMat();
    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$ ENTRO EN CREAR ANIMACION AMIGAS');
    // var model=this.gestorRecursos.getRecurso(name,gl);
    // console.log(model);
    var nodo = new Nodo();
    var anim = new Animacion(mat); 
    
    nodo.setEntidad(anim);
    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$ SALGO DE CREAR ANIMACION AMIGAS');
    return nodo;
};

Motor.prototype.crearEscena=function(){
    var escena=new Nodo();
    this.escena=escena;

    return escena;
};

/////////////////////////////////////////// TRANSFORMACIONES /////////////////////////////

Motor.prototype.crearTraslacion=function(x,y,z){
    var nodo=new Nodo();
    var trans= new Transformacion();
    trans.trasladar(x,y,z);
    nodo.setEntidad(trans);

    return nodo;
};

Motor.prototype.crearRotacion=function(a,x,y,z){
    var nodo=new Nodo();
    var rot= new Transformacion();
    rot.rotar(a,x,y,z);
    nodo.setEntidad(rot);

    return nodo;
};

Motor.prototype.crearEscalado=function(x,y,z){
    var nodo=new Nodo();
    var esc= new Transformacion();
    esc.escalar(x,y,z);
    nodo.setEntidad(esc);

    return nodo;
};

Motor.prototype.crearTransponer=function(){
    var nodo=new Nodo();
    var rot= new Transformacion();
    rot.transponer();
    nodo.setEntidad(rot);

    return nodo;
};

Motor.prototype.invertir=function(){
    var nodo=new Nodo();
    var inv= new Transformacion();
    inv.invert();
    nodo.setEntidad(inv);

    return nodo;
};

Motor.prototype.crearIdentidad=function(){
    var nodo=new Nodo();
    var rot= new Transformacion();
    rot.identidad();
    nodo.setEntidad(rot);

    return nodo;
};

/////////////////////////////////////////// END-TRANSFORMACIONES /////////////////////////////


Motor.prototype.unirNodos=function(p,h){
    var nodo=p.addHijo2(h); //borrar en el caso de que no se necesite
    return nodo;
};

Motor.prototype.addLuz=function(l){
    this.luz=l;
};

Motor.prototype.addCamara=function(c){
    this.camara=c;
};

Motor.prototype.iniciarLuces=function(){
    
    lucestotales = this.luz;

    // console.log("LA MATRIZ DE LUCES: ");
    // console.log(lucestotales);
};



Motor.prototype.draw=function(){
    //--inicializar luces
    //-----------------------

    //--inicializar el viewport
    gl.clearColor(1.0,1.0,1.0, 1.0);
    gl.clearDepth(100.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.viewport(0, 0, c_width, c_height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //-----------------------

    //--inicializar camara
    //-----------------------
    var aux=this.escena;
    var self = this;
    this.drawSceneHook  = function(){
        aux.draw();
        // self.initViewMatrix();
    }
    WEBGLAPP_RENDER = this.drawSceneHook;
    renderLoop(); 
};
