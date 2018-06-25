

var app=null;

  // Funcion inicio al iniciar la página

function Inicio(){

  // Iniciamos la app 
  
  app= new WebGLApp("canvas-element-id");

  // Creamos el motor

  var motor= new Motor();

  //-------------------- ARBOL --------------------//

  var escena= motor.crearEscena();

  //----------- LUCES -----------//
  // El motor funciona con varias luces simultáneas //

  var traslaLuz1= motor.crearTraslacion(0.0,0.0,0.0);
  var rotaLuz1= motor.crearRotacion(0,0,0,0);

  var traslaLuz2= motor.crearTraslacion(0.0,0.0,0.0);
  var rotaLuz2= motor.crearRotacion(0,0,0,0);

  var traslaLuz3= motor.crearTraslacion(0.0,0.0,0.0);
  var rotaLuz3= motor.crearRotacion(0,0,0,0);

  var traslaLuz4= motor.crearTraslacion(0.0,0.0,0.0);
  var rotaLuz4= motor.crearRotacion(0,0,0,0);

  var traslaLuz5= motor.crearTraslacion(0.0,0.0,0.0);
  var rotaLuz5= motor.crearRotacion(0,0,0,0);


  // Valores para crear las luces

  // var pos1= [-7.5,0.0,-1.0];
  // var pos2= [-7.5, 3.0, -8.0];
  // var pos3= [0.0, 0.0, -8.0];

  var pos1= [4.0,2.0,-6.0];
  var pos2= [9.0, 2.0, -6.0];
  var pos3= [0.0, 2.5, -6.0];
  var pos4= [-4.0, 2.0, -6.0];
  var pos5= [-8.0, 0.0, -6.0];

  var am1= [1.0, 1.0, 1.0];//[0.2, 0.1, 0.1];
  var am2= [1.0, 1.0, 1.0];//[0.2, 0.1, 0.1];
  var am3= [1.0, 1.0, 1.0];//[0.1, 0.1, 0.1];
  var am4= [1.0, 1.0, 1.0];//[0.1, 0.1, 0.1];
  var am5= [1.0, 1.0, 1.0];//[0.1, 0.1, 0.1];

  var dif1= [1.0, 1.0, 1.0];//[0.6, 0.6, 0.6];//[0.8, 0.4, 2.0];
  var dif2= [1.0, 1.0, 1.0];//[0.6, 0.6, 0.6];//[0.8, 0.4, 2.7];
  var dif3= [1.0, 1.0, 1.0];//[0.6, 0.6, 0.6];//[0.1, 0.4, 1.0];
  var dif4= [1.0, 1.0, 1.0];//[0.6, 0.6, 0.6];//[0.1, 0.4, 1.0];

  var esp1= [1.0, 1.0, 1.0];
  var esp2= [1.0, 1.0, 1.0];
  var esp3= [1.0, 1.0, 1.0];
  var esp4= [1.0, 1.0, 1.0];

  var em1= [100.0, 100.0, 100.0];
  var em2= [100.0, 100.0, 100.0];
  var em3= [100.0, 100.0, 100.0];
  var em4= [100.0, 100.0, 100.0];

  var am6= [0.4, 0.4, 0.4];//[0.2, 0.1, 0.1];
  var dif6= [0.4, 0.4, 0.4];//[0.6, 0.6, 0.6];//[0.8, 0.4, 2.0];
  var esp6= [1.0, 1.0, 1.0];//[0.6, 0.6, 0.6];//[0.8, 0.4, 2.0];
  var em6= [0.5, 0.5, 0.5];//[0.6, 0.6, 0.6];//[0.8, 0.4, 2.0];



  var luz1 = motor.crearLuz( pos1,dif6,am6,em6,esp6 );
  var luz2 = motor.crearLuz( pos2,dif6,am6,em6,esp6 );
  var luz3 = motor.crearLuz( pos3,dif6,am6,em6,esp6 );
  var luz4 = motor.crearLuz( pos4,dif6,am6,em6,esp6 );
  var luz5 = motor.crearLuz( pos5,dif6,am6,em6,esp6 );

  // Unimos los nodos

  // motor.unirNodos( escena,traslaLuz1 );
  // motor.unirNodos( escena,traslaLuz2 );
  // motor.unirNodos( escena,traslaLuz3 );
  // motor.unirNodos( escena,traslaLuz3 );
  // motor.unirNodos( escena,traslaLuz4 );
  // motor.unirNodos( escena,traslaLuz5 );

  // motor.unirNodos( traslaLuz1,rotaLuz1 );
  // motor.unirNodos( traslaLuz2,rotaLuz2 );
  // motor.unirNodos( traslaLuz3,rotaLuz3 );
  // motor.unirNodos( traslaLuz4,rotaLuz4 );
  // motor.unirNodos( traslaLuz5,rotaLuz5 );

  // motor.unirNodos( rotaLuz1, luz1 );
  // motor.unirNodos( rotaLuz2, luz2 );
  // motor.unirNodos( rotaLuz3, luz3 );
  // motor.unirNodos( rotaLuz4, luz4 );
  // motor.unirNodos( rotaLuz5, luz5 );



  // motor.crearNodo( rotaLuz,luz1 );
  // motor.crearNodo( rotaLuz,luz2 );
  // motor.crearNodo( rotaLuz,luz3 );


  //----------- CAMARA -----------//

  var traslaCam= motor.crearTraslacion(0.0,0.0,0.0); // es -6 // 1- -5.5 // 2- -2.5 //3- 2.0 //4-  6  // 5 10 // todo esto con canvas width="600" height="300"
  var rotaCam= motor.crearRotacion(0,0,0,);

  motor.unirNodos(escena,traslaCam);
  motor.unirNodos(traslaCam,rotaCam);

  var camEnt=motor.crearCamara();
  camEnt.setAtributos(30, c_width / c_height, 0.1, 10000.0);
  //camEnt.setParalela();
  camEnt.setPerspectiva();
  motor.addCamara(camEnt);
  var camara=motor.crearNodo(rotaCam,camEnt);

  // Iniciamos las luces

  motor.iniciarLuces();

  // Iniciamos el programa

  Program.load();

  //----------- OBJETOS -----------//

  // var trasCubo= motor.crearTraslacion(2.0,-1.0,-8.0);
  // var rotaCubo= motor.crearRotacion(270,1,0,0);
  // var rotaCubo2= motor.crearRotacion(15,0,0,1);

  // var cubo = motor.crearMalla("texturized.json");

  // motor.unirNodos(escena,trasCubo);
  // motor.unirNodos(trasCubo,rotaCubo);
  // motor.unirNodos(rotaCubo,rotaCubo2);
  // motor.unirNodos(rotaCubo2,cubo);


  var trasCubo= motor.crearTraslacion(-8.0,0.25,-7.0);
  var rotaCubo= motor.crearRotacion(180,1,0,0);
  var rotaCubo2= motor.crearRotacion(0,0,1,0);

  var cubo = motor.crearMalla("hoja-buenodeltodo.json","mat-hoja.json");

  motor.unirNodos(escena,trasCubo);
  motor.unirNodos(trasCubo,rotaCubo);
  motor.unirNodos(rotaCubo,rotaCubo2);
  motor.unirNodos(rotaCubo2,cubo);

  var trasCubo= motor.crearTraslacion(-4.0,0.15,-7.0);
  var rotaCubo= motor.crearRotacion(180,1,0,0);
  var rotaCubo2= motor.crearRotacion(0,0,1,0);

  var cubo = motor.crearMalla("avion-bueno.json","mat-avion.json");

  motor.unirNodos(escena,trasCubo);
  motor.unirNodos(trasCubo,rotaCubo);
  motor.unirNodos(rotaCubo,rotaCubo2);
  motor.unirNodos(rotaCubo2,cubo);


  var trasCubo= motor.crearTraslacion(0.0,0.25,-7.0);
  var rotaCubo= motor.crearRotacion(180,1,0,0);
  var rotaCubo2= motor.crearRotacion(0,0,0,0);

  var cubo = motor.crearMalla("rayo-buenodeltodo.json","mat-rayo.json");

  motor.unirNodos(escena,trasCubo);
  motor.unirNodos(trasCubo,rotaCubo);
  motor.unirNodos(rotaCubo,rotaCubo2);
  motor.unirNodos(rotaCubo2,cubo);


  var trasCubo= motor.crearTraslacion(4.0,0.25,-7.0);
  var rotaCubo= motor.crearRotacion(180,1,0,0);
  var rotaCubo2= motor.crearRotacion(0,0,0,0);

  var cubo = motor.crearMalla("corazon-buenodeltodo.json","mat-corazon.json");

  motor.unirNodos(escena,trasCubo);
  motor.unirNodos(trasCubo,rotaCubo);
  motor.unirNodos(rotaCubo,rotaCubo2);
  motor.unirNodos(rotaCubo2,cubo);


  var trasCubo= motor.crearTraslacion(8.0,0.25,-7.0);
  var rotaCubo= motor.crearRotacion(180,1,0,0);
  var rotaCubo2= motor.crearRotacion(0,0,0,0);

  var cubo = motor.crearMalla("estrella-buenodeltodo.json","mat-estrella.json");


  motor.unirNodos(escena,trasCubo);
  motor.unirNodos(trasCubo,rotaCubo);
  motor.unirNodos(rotaCubo,rotaCubo2);
  motor.unirNodos(rotaCubo2,cubo);




  // Mono

  // var traslaMono=motor.crearTraslacion(0.0,0.0,-6.0); 
  // var rotaMono=motor.crearRotacion/*(0,0,0,0);*/(270,1,0,0);
  // var rotaMono2=motor.crearRotacion(50,0,0,1);
  // var escaMono=motor.crearEscalado(2.0,2.0,2.0);
  // var trans=motor.crearTransponer();
  // var inv=motor.invertir();

  // var mono =motor.crearMalla("texturized.json");

  // motor.unirNodos(escena,traslaMono);
  // motor.unirNodos(traslaMono,rotaMono);
  // motor.unirNodos(rotaMono,rotaMono2);
  // // motor.unirNodos(escaMono, trans);
  // // motor.unirNodos(trans,rotaMono2);
  // motor.unirNodos(rotaMono2, mono);

  //----------------------------//


  // Dibujamos

  motor.draw();

  //app.run();

  //----------------------------//

}



