function inicio(x,y,z){
   for(var i=0; i< y.length; i++){
        var yaux=y[i].split('T');
        y[i] = yaux[0];
    }

    escena = new Nodo();
    gestor = new Gestor();
    motor = new Motor(escena, gestor);

    var canvas = document.getElementById("glcanvas");

    gl = initContext(canvas); // Inicializamos el contexto webgl
    initShaders(); //iniciamos los shaders

    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
    crearEscena(x,y,z);
    //motor.draw();
    renderLoop();

}

function crearEscena(x,y,z) {

    luzyCamara();
    crearBarras(x, y, z);
    crearEjes();
    //crearTextos(y);
                        //izq, abajo, fondo
    //tras2.trasladar(-auxDespX*2, -10, -auxDespX*6);
    tras2.trasladar(-auxDespX*2, -8, -auxDespX*8);
    tras2.rotar(degToRad(60 / 2), 1, 0, 0);

}

function luzyCamara(){
    tras1 = motor.crearTransform();
    tras2 = motor.crearTransform();
    tras3 = motor.crearTransform();

    tras1.trasladar(0, 100, 100);

    luz = motor.crearLuz(0.8, 0.4, 0.6);
    camara = motor.crearCamara();
    malla1 = motor.crearMalla('../js/motor/recursos/caja.json', gl);

    nodoTras1 = motor.crearNodo(motor.escena,tras1);
    nodoTras2 = motor.crearNodo(motor.escena,tras2);
    nodoTras3 = motor.crearNodo(motor.escena,tras3);

    nodoLuz = motor.crearNodo(nodoTras1,luz);
    nodoCamara = motor.crearNodo(nodoTras3,camara);

    //nViewport = motor.registrarViewport(0, 0, 1000, 500);
    nViewport = motor.registrarViewport(0, 0, canvasWidth, canvasHeight);
    motor.setViewportActivo(nViewport);
    nCamara = motor.registrarCamara(nodoCamara);
    motor.setCamaraActiva(nCamara);

    nLuz = motor.registrarLuz(nodoLuz);
    motor.setLuzActiva(nLuz);
}

function crearBarras(x,y,z){
    var priFech = new Date(y[0]);
    for(var i = 0; i< y.length; i++){
        if(priFech>new Date(y[i]))
            priFech = new Date(y[i]);
    }

    var empleado = "";
    var auxEmpleado = x[0];
    despZ = 0;
    var despX = 0;
    auxDespX = 0;
    tamZ = 0;
    auxTamZ = 0;
    for(var i = 0; i<x.length; i++) {
        if (tamZ < z[i]) {
            tamZ = z[i];
            auxTamZ = i;
        }
    }
    for(var i = 0; i<x.length; i++){
        despX = new Date(y[i])-priFech;
        despX = (((despX/1000)/60)/60)/24;
        empleado = x[i];
        if(empleado != auxEmpleado){
            despZ++;
            auxEmpleado = empleado;
        }
        if(despX > auxDespX){
            auxDespX = despX;
        }
        tras = motor.crearTransform();
        nodoTras = motor.crearNodo(nodoTras2,tras);
        nodoAux = motor.crearNodo(nodoTras,malla1);
        tras.trasladar(0,1,-2);
        if(i!=auxTamZ)
            tras.escalar(1,z[i]/tamZ,1);
        else
            tras.escalar(1,5,1);
        tras.trasladar((despX*4+2),1,-despZ*4);
    }
}

function crearEjes(){
    rejilla = new Rejilla();
    rejilla.cargarVertices(0,1,0);
    rejilla.cargarVertices((auxDespX+1)*4,1,0);
    rejilla.cargarVertices(0,1,0);
    rejilla.cargarVertices(0,1,-(despZ+1)*4);
    rejilla.cargarVertices(0,1,0);
    rejilla.cargarVertices(0,11,0);
    for(var i = 1; i<=5 ; i++){
        rejilla.cargarVertices(0,2*i+1,0);
        rejilla.cargarVertices(2,2*i+1,0);

        rejilla.cargarVertices(0,2*i+1,0);
        rejilla.cargarVertices(0,2*i+1,-2);
    }
    for(var i = 1; i<auxDespX+2; i++){
        rejilla.cargarVertices(i*4,1,0);
        rejilla.cargarVertices(i*4,1,-(despZ+1)*4);
    }
    for(var i = 1; i<despZ+2; i++){
        rejilla.cargarVertices(0,1,-i*4);
        rejilla.cargarVertices((auxDespX+1)*4,1,-i*4);
    }

    tras = motor.crearTransform();
    nodoTras = motor.crearNodo(nodoTras2,tras);
    nodoAux = motor.crearNodo(nodoTras,rejilla);
}
function crearTextos(y){
    y.sort();
    var loader = new THREE.FontLoader();
    loader.load( '../js/motor/recursos/font.js', function ( font ) {
        for(var i=0; i< y.length; i++){
            if(i>0) {
                if (y[i] != y[i - 1]) {
                    var geometry = new THREE.TextGeometry(y[i], {
                        font: font,
                        size: 80,
                        height: 20,
                        curveSegments: 2
                    });
                    //geometry.computeBoundingBox();
                }
            }else{
                var geometry = new THREE.TextGeometry(y[i],{
                    font: font,
                    size: 80,
                    height: 20,
                    curveSegments: 2
                });
                //geometry.computeBoundingBox();
            }

            texto = motor.crearTexto(geometry,gl);
            tras = motor.crearTransform();
            nodoTras = motor.crearNodo(nodoTras2,tras);
            nodoAux = motor.crearNodo(nodoTras,texto);
            tras.escalar(10,10,10);

        }
    });
}

function renderLoop(){
    requestAnimFrame(renderLoop);
    motor.draw();
}

requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000/60);
        };
})();


function initContext(canvas) {
    gl = null;

    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;



        //var canvasWidth2 = document.getElementById('pvt-cuerpo-principal').offsetWidth;
       // var canvasHeight2  = document.getElementById('pvt-cuerpo-principal').offsetHeight;

        //gl.viewportWidth = canvasWidth2;
        //gl.viewportHeight = canvasHeight2;

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

        //canvasWidth = canvasWidth2;
        //canvasHeight = canvasHeight2;
    }
    catch(e) {}

    if (!gl) {
        alert("Lo sentimos. No se ha podido inicializar webGL en este navegador.");
        gl = null;
    }
    return gl;
}



function initShaders() {

    var fragmentShader =getShader(gl, 'shader-fs');
    var vertexShader = getShader(gl, 'shader-vs');

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked)
        console.error(gl.getProgramInfoLog(program));

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert('No han podido iniciarse los shaders');
    }

    gl.useProgram(program);

    program.VertexPosition = gl.getAttribLocation(program, 'VertexPosition');
    gl.enableVertexAttribArray(program.VertexPosition);

    program.VertexNormal = gl.getAttribLocation(program, 'VertexNormal');
    gl.enableVertexAttribArray(program.VertexNormal);

    program.VertexTexture = gl.getAttribLocation(program, "TextureCoord");
    gl.enableVertexAttribArray(program.VertexTexture);

    program.posLuz = gl.getUniformLocation(program, 'uPosicionLuz'); //posición de la luz
    program.ambi = gl.getUniformLocation(program, 'uAmbientalLuz'); //componente ambiental de la luz
    program.difu = gl.getUniformLocation(program, 'uDifusaLuz'); //componente difusa de la luz
    program.espec = gl.getUniformLocation(program, 'uEspecularLuz'); //componente especular de la luz
    program.shin = gl.getUniformLocation(program, 'uBrillo');

    program.mvMatrixUniform = gl.getUniformLocation(program, 'ModelViewMatrix');
    program.normalMatrixUniform = gl.getUniformLocation(program, 'NormalMatrix');
    program.pMatrixUniform = gl.getUniformLocation(program, 'ProjectionMatrix');

    program.samplerUniform = gl.getUniformLocation(program, "sampler");
    program.activa = gl.getUniformLocation(program, "activa");


}

/////////////////////////////////////////////////////////////
//Siempre asi
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3)
            str += k.textContent;
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(id);
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;

function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
    if (!mouseDown) {
        return;
    }

    if(document.getElementById('roT').checked){
        var newX = event.clientX;
        var newY = event.clientY;

        var deltaX = newX - lastMouseX;
        tras2.rotar(degToRad(deltaX / 2), 0, 1, 0);

        var deltaY = newY - lastMouseY;
        tras2.rotar(degToRad(deltaY / 2), 1, 0, 0);

        lastMouseX = newX;
        lastMouseY = newY;
    }else if(document.getElementById('roX').checked){
        var newX = event.clientX;

        var deltaX = newX - lastMouseX;
        tras2.rotar(degToRad(deltaX / 2), 0, 1, 0);

        lastMouseX = newX;
    }else if(document.getElementById('roY').checked){
        var newY = event.clientY;

        var deltaY = newY - lastMouseY;
        tras2.rotar(degToRad(deltaY / 2), 1, 0, 0);

        lastMouseY = newY;
    }else if(document.getElementById('desp').checked){
        var newX = event.clientX;

        var deltaX = newX - lastMouseX;
        tras2.trasladar(deltaX/4, 0, 0);

        lastMouseX = newX;
    }else if(document.getElementById('zoom').checked){
        var newY = event.clientY;

        var deltaY = newY - lastMouseY;
        tras2.trasladar(0, 0, deltaY/4);

        lastMouseY = newY;
    }

}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function refrescar(){
    tras2.identidad();
    tras2.trasladar(-auxDespX*2, -8, -auxDespX*8);
    tras2.rotar(degToRad(60 / 2), 1, 0, 0);
    /*
    if (tamZ < 1){
        tras2.trasladar(-auxDespX*2, -2, -auxDespX*3);
        tras2.rotar(degToRad(60 / 2), 1, 0, 0);
    }else {
        tras2.trasladar(-auxDespX*2, -tamZ, -auxDespX*6);
        tras2.rotar(degToRad(60 / 2), 1, 0, 0);
    }
    */
}