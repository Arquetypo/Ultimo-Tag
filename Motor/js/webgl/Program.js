'use strict';

var Program = {

    
    getShader : function(gl, id) {
       var script = document.getElementById(id);
       if (!script) {
           return null;
       }

        var str = "";
        var k = script.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (script.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (script.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    },
    
    
    load : function() {

     var fragmentShader          = Program.getShader(gl, "shader-fs");
     var vertexShader            = Program.getShader(gl, "shader-vs");
     
     prg = gl.createProgram();
     gl.attachShader(prg, vertexShader);
     gl.attachShader(prg, fragmentShader);
     
     
    
     
     gl.bindAttribLocation(prg, 0 , "aVertexPosition");
     //---------------------------------------------------// 
     gl.linkProgram(prg);

     if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
     }

     gl.useProgram(prg);
     
     

     prg.aVertexPosition  = gl.getAttribLocation(prg, "aVertexPosition");
     //---------------------------------------------------// 
     gl.enableVertexAttribArray(prg.aVertexPosition);
     //---------------------------------------------------// 
     
     prg.aVertexNormal    = gl.getAttribLocation(prg, "aVertexNormal");
     prg.aVertexColor     = gl.getAttribLocation(prg, "aVertexColor");
     prg.aVertexTexture  = gl.getAttribLocation(prg, "aVertexTexture");
     prg.vVertexTexture   = gl.getUniformLocation(prg, "vVertexTexture")
     gl.enableVertexAttribArray(prg.aVertexTexture);
     gl.enableVertexAttribArray(prg.vVertexTexture);
     gl.enableVertexAttribArray(prg.aVertexNormal);

    prg.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");
    prg.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
    prg.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");
    prg.uMatrixCamara    = gl.getUniformLocation(prg, "uMatrixCamara");



    // Phong

    prg.Ka = gl.getUniformLocation(prg, "Ka");
    prg.Kd = gl.getUniformLocation(prg, "Kd");
    prg.Ks = gl.getUniformLocation(prg, "Ks");
    prg.shininessVal = gl.getUniformLocation(prg, "shininessVal");
    prg.ambientColor = gl.getUniformLocation(prg, "ambientColor");
    prg.diffuseColor = gl.getUniformLocation(prg, "diffuseColor");
    prg.specularColor = gl.getUniformLocation(prg, "specularColor");
    prg.lightPos = gl.getUniformLocation(prg, "lightPos");

    //////////////////////

    // SOMBRAS

    prg.lightShadowMap = gl.getUniformLocation(prg, "lightShadowMap");
    prg.shadowClipNearFar = gl.getUniformLocation(prg, "shadowClipNearFar");

    

    gl.uniform1f(prg.lightShadowMap, 0);
    

    //////////

    // Luces

        // Posiciones

    
    prg.uLightPos = gl.getUniformLocation(prg, "uLightPos");

    var auxPos=[];
    
    for(var i=0; i<lucestotales.length; i++){
        for(var j=0; j<lucestotales[i].posicion.length; j++){
        auxPos.push(lucestotales[i].posicion[j]);
    }}

    //console.log("LA Posicion VIENE AQUI: -->>>>>");
    //console.log(auxPos);

    gl.uniform3fv(prg.uLightPos, auxPos); 


        // Ambiental

    
    prg.uLightAmbient = gl.getUniformLocation(prg, "uLightAmbient");

    var auxAmbient=[];
    
    for(var i=0; i<lucestotales.length; i++){
        for(var j=0; j<lucestotales[i].ambiente.length; j++){
        auxAmbient.push(lucestotales[i].ambiente[j]);
    }}

    // console.log("LA Ambiental VIENE AQUI: -->>>>>");
    // console.log(auxAmbient);

    gl.uniform3fv(prg.uLightAmbient, auxAmbient); 

        // Difusa

    prg.uLightDifuse = gl.getUniformLocation(prg, "uLightDifuse");

    var auxDifuse=[];
    
    for(var i=0; i<lucestotales.length; i++){
        for(var j=0; j<lucestotales[i].difusa.length; j++){
        auxDifuse.push(lucestotales[i].difusa[j]);
    }}

    // console.log("LA DIFUSA VIENE AQUI: -->>>>>");
    // console.log(auxDifuse);

    gl.uniform3fv(prg.uLightDifuse, auxDifuse); 

        // Especular

    prg.uLightSpecular = gl.getUniformLocation(prg, "uLightSpecular");

    var auxSpecular=[];
    
    for(var i=0; i<lucestotales.length; i++){
        for(var j=0; j<lucestotales[i].especular.length; j++){
        auxSpecular.push(lucestotales[i].especular[j]);
    }}

    // console.log("LA SPECULAR VIENE AQUI: -->>>>>");
    // console.log(auxSpecular);

    gl.uniform3fv(prg.uLightSpecular, auxSpecular); 






    



        
        



    /////////////////////7

    gl.uniform1i(gl.getUniformLocation(prg, "uSampler"), 0);

    // Valores del phong

    gl.uniform1f(prg.Ka, 0.2);
    gl.uniform1f(prg.Kd, 0.7);
    gl.uniform1f(prg.Ks, 0.8);



    //////////////////////
        
    prg.uLightDirection  = gl.getUniformLocation(prg, "uLightDirection");
    prg.uLightAmbient    = gl.getUniformLocation(prg, "uLightAmbient");
    prg.uMaterialDiffuse = gl.getUniformLocation(prg, "uMaterialDiffuse");



    


     /*prg.aTextureCoord     = gl.getAttribLocation(prg, "aTextureCoord");

     prg.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");
     prg.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
     prg.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");
     
     prg.uMaterialDiffuse  = gl.getUniformLocation(prg, "uMaterialDiffuse");
     prg.uLightAmbient     = gl.getUniformLocation(prg, "uLightAmbient");
     prg.uLightDiffuse     = gl.getUniformLocation(prg, "uLightDiffuse");
     prg.uLightPosition    = gl.getUniformLocation(prg, "uLightPosition");
     prg.uUpdateLight      = gl.getUniformLocation(prg, "uUpdateLight");
     prg.uWireframe        = gl.getUniformLocation(prg, "uWireframe");
     prg.uPerVertexColor   = gl.getUniformLocation(prg, "uPerVertexColor");
     prg.vTextureCoord   = gl.getUniformLocation(prg, "vTextureCoord");*/


     // Mis luces

   /* gl.uniform3fv(prg.uLightDirection,  [0.0, 0.0, -1.0]);
    gl.uniform4fv(prg.uLightAmbient,    [0.1,0.1,0.1,1.0]);
    gl.uniform4fv(prg.uLightDiffuse,    [0.6,0.6,0.6,1.0]);  
    gl.uniform4fv(prg.uMaterialDiffuse, [0.6,0.15,0.15,1.0]);*/



     ////////////

     /*console.log("EJECUTO LAS LUCES");console.log(LuzMatrix);console.log(LuzMatrix[12]);console.log(LuzMatrix[13]);console.log(LuzMatrix[14]);
    var auux=[];
    auux.push([LuzMatrix[12],LuzMatrix[13],LuzMatrix[14]]);
    auux.push([LuzMatrix[3],LuzMatrix[2],LuzMatrix[3]])
     gl.uniform3fv(prg.uLightPosition,     auux);
     gl.uniform4fv(prg.uLightAmbient,      [0.20,0.20,0.20,1.0]);
     gl.uniform4fv(prg.uLightDiffuse,      [1.0,1.0,1.0,1.0]); */
/*     gl.uniform3fv(prg.uLightPosition,     [LuzMatrix[12],LuzMatrix[13],LuzMatrix[14], 1.0 ,1.0  ,1.0 ]);
*/     
     //gl.uniform4fv(prg.uLightAmbient,      [0.20,0.20,0.20,1.0]);
/*     gl.uniform4fv(prg.uLightDiffuse,      [0.0,1.0,1.0,1.0, 1.0,0.0,1.0,1.0]);
*/    
     //gl.uniform3fv(prg.uLightPosition, motor.getLucesActivasPos());
     //gl.uniform4fv(prg.uLightDiffuse,  motor.getLucesActivasDif());

    //console.log(motor.getLucesActivasDif());
    //console.log(motor.getLucesActivasPos());

    }
};