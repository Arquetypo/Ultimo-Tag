

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
  camEnt.setAtributos(90, c_width / c_height, 0.1, 10000.0);
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




 
  var animacion1 = motor.crearAnimacion("mat-corazon.json");
  for(i=1; i<20; i++){
    if(i<10){
      animacion1.getEntidad().pushMalla("animacion/1/a1_00000"+i+".obj"); 
    }
    else if(i<100){ 
      animacion1.getEntidad().pushMalla("animacion/1/a1_0000"+i+".obj"); 
    }
    else {
      animacion1.getEntidad().pushMalla("animacion/1/a1_000"+i+".obj"); 
    }    
  }

  var trasCuboan1= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboan1= motor.crearRotacion(0,1,0,0);
  var rotaCubo2an1= motor.crearRotacion(0,0,1,0);
  
  motor.unirNodos(escena,trasCuboan1);
  motor.unirNodos(trasCuboan1,rotaCuboan1);
  motor.unirNodos(rotaCuboan1,rotaCubo2an1);
  motor.unirNodos(rotaCubo2an1,animacion1);  

  var animacion2 = motor.crearAnimacion("mat-rayo.json");
  for(i=1; i<85; i++){
    if(i<10){
      animacion2.getEntidad().pushMalla("animacion/2/a2_00000"+i+".obj"); 
    }
    else if(i<100){ 
      animacion2.getEntidad().pushMalla("animacion/2/a2_0000"+i+".obj"); 
    }
    else {
      animacion2.getEntidad().pushMalla("animacion/2/a2_000"+i+".obj"); 
    }    
  }


  var trasCuboan2= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboan2= motor.crearRotacion(0,1,0,0);
  var rotaCubo2an2= motor.crearRotacion(0,0,1,0);
  
  motor.unirNodos(escena,trasCuboan2);
  motor.unirNodos(trasCuboan2,rotaCuboan2);
  motor.unirNodos(rotaCuboan2,rotaCubo2an2);
  motor.unirNodos(rotaCubo2an2,animacion2);  

    var animacion31 = motor.crearAnimacion("mat-corazon.json");
  for(i=1; i<20; i++){
    if(i<10){
      animacion31.getEntidad().pushMalla("animacion/3.1/a3.1_00000"+i+".obj"); 
    }
    else if(i<100){ 
      animacion31.getEntidad().pushMalla("animacion/3.1/a3.1_0000"+i+".obj"); 
    }
    else {
      animacion31.getEntidad().pushMalla("animacion/3.1/a3.1_000"+i+".obj"); 
    }    
  }


  var trasCuboan3= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboan3= motor.crearRotacion(0,1,0,0);
  var rotaCubo2an3= motor.crearRotacion(0,0,1,0);
  
  motor.unirNodos(escena,trasCuboan3);
  motor.unirNodos(trasCuboan3,rotaCuboan3);
  motor.unirNodos(rotaCuboan3,rotaCubo2an3);
  motor.unirNodos(rotaCubo2an3,animacion31);

    var animacion32 = motor.crearAnimacion("mat-rayo.json");
  for(i=1; i<50; i++){
    if(i<10){
      animacion32.getEntidad().pushMalla("animacion/3.2/a3.2_00000"+i+".obj"); 
    }
    else if(i<100){ 
      animacion32.getEntidad().pushMalla("animacion/3.2/a3.2_0000"+i+".obj"); 
    }
    else {
      animacion32.getEntidad().pushMalla("animacion/3.2/a3.2_000"+i+".obj"); 
    }    
  }


  var trasCuboan32= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboan32= motor.crearRotacion(0,1,0,0);
  var rotaCubo2an32= motor.crearRotacion(0,0,1,0);
  
  motor.unirNodos(escena,trasCuboan32);
  motor.unirNodos(trasCuboan32,rotaCuboan32);
  motor.unirNodos(rotaCuboan32,rotaCubo2an32);
  motor.unirNodos(rotaCubo2an32,animacion32);


    var animacion33 = motor.crearAnimacion("mat-rayo.json");
  for(i=1; i<50; i++){
    if(i<10){
      animacion33.getEntidad().pushMalla("animacion/3.3/a3.3_00000"+i+".obj"); 
    }
    else if(i<100){ 
      animacion33.getEntidad().pushMalla("animacion/3.3/a3.3_0000"+i+".obj"); 
    }
    else {
      animacion33.getEntidad().pushMalla("animacion/3.3/a3.3_000"+i+".obj"); 
    }    
  }


  var trasCuboan33= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboan33= motor.crearRotacion(0,1,0,0);
  var rotaCubo2an33= motor.crearRotacion(0,0,1,0);
  
  motor.unirNodos(escena,trasCuboan33);
  motor.unirNodos(trasCuboan33,rotaCuboan33);
  motor.unirNodos(rotaCuboan33,rotaCubo2an33);
  motor.unirNodos(rotaCubo2an33,animacion33);
  //  var animacion3 = motor.crearAnimacion("mat-hoja.json");
  // for(i=1; i<7; i++){
  //   if(i<10){
  //     animacion3.getEntidad().pushMalla("animacion/3.1/a3.1_00000"+i+".obj"); 
  //   }
  //   else if(i<100){ 
  //     animacion3.getEntidad().pushMalla("animacion/3.1/a3.1_0000"+i+".obj"); 
  //   }
  //   else {
  //     animacion3.getEntidad().pushMalla("animacion/3.1/a3.1_000"+i+".obj"); 
  //   }    
  // }

  // var trasCuboan3= motor.crearTraslacion(0.0,0.25,-9.0);
  // var rotaCuboan3= motor.crearRotacion(0,1,0,0);
  // var rotaCubo2an3= motor.crearRotacion(0,0,1,0);
  
  // motor.unirNodos(escena,trasCuboan3);
  // motor.unirNodos(trasCuboan3,rotaCuboan3);
  // motor.unirNodos(rotaCuboan3,rotaCubo2an3);
  // motor.unirNodos(rotaCubo2an3,animacion3);  


  // var animation2 = motor.crearAnimacion("mat-avion.json");
  // for(i=1; i<9; i++){
  //   if(i<10){
  //     animation2.getEntidad().pushMalla("animacion/untitled_00000"+i+".obj"); 
  //   }
  //   else if(i<100){ 
  //     animation2.getEntidad().pushMalla("animacion/untitled_0000"+i+".obj"); 
  //   }
  //   else {
  //     animation2.getEntidad().pushMalla("animacion/untitled_000"+i+".obj"); 
  //   }    
  // }
  // var animation3 = motor.crearAnimacion("mat-rayo.json");
  // for(i=1; i<9; i++){
  //   if(i<10){
  //     animation3.getEntidad().pushMalla("animacion/untitled_00000"+i+".obj"); 
  //   }
  //   else if(i<100){ 
  //     animation3.getEntidad().pushMalla("animacion/untitled_0000"+i+".obj"); 
  //   }
  //   else {
  //     animation3.getEntidad().pushMalla("animacion/untitled_000"+i+".obj"); 
  //   }    
  // }
  // var animation4 = motor.crearAnimacion("mat-corazon.json");
  // for(i=1; i<9; i++){
  //   if(i<10){
  //     animation4.getEntidad().pushMalla("animacion/untitled_00000"+i+".obj"); 
  //   }
  //   else if(i<100){ 
  //     animation4.getEntidad().pushMalla("animacion/untitled_0000"+i+".obj"); 
  //   }
  //   else {
  //     animation4.getEntidad().pushMalla("animacion/untitled_000"+i+".obj"); 
  //   }    
  // }
  //  var animation5 = motor.crearAnimacion("mat-estrella.json");
  // for(i=1; i<9; i++){
  //   if(i<10){
  //     animation5.getEntidad().pushMalla("animacion/untitled_00000"+i+".obj"); 
  //   }
  //   else if(i<100){ 
  //     animation5.getEntidad().pushMalla("animacion/untitled_0000"+i+".obj"); 
  //   }
  //   else {
  //     animation5.getEntidad().pushMalla("animacion/untitled_000"+i+".obj"); 
  //   }    
  // } 


  var trasCuboa= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCuboa= motor.crearRotacion(0,1,0,0);
  var rotaCubo2a= motor.crearRotacion(0,0,1,0);
  var cuboa = motor.crearMalla("1.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCuboa);
  motor.unirNodos(trasCuboa,rotaCuboa);
  motor.unirNodos(rotaCuboa,rotaCubo2a);
  motor.unirNodos(rotaCubo2a,cuboa);
  

  var trasCubob= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCubob= motor.crearRotacion(0,1,0,0);
  var rotaCubo2b= motor.crearRotacion(0,0,1,0);
  var cubob = motor.crearMalla("2.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCubob,rotaCubob);
  motor.unirNodos(trasCubob,rotaCubob);
  motor.unirNodos(rotaCubob,rotaCubo2b);
  motor.unirNodos(rotaCubo2b,cubob);  

  var trasCucoc= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCucoc= motor.crearRotacion(0,1,0,0);
  var rotaCuco2c= motor.crearRotacion(0,0,1,0);
  var cucoc = motor.crearMalla("3.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCucoc,rotaCucoc);
  motor.unirNodos(trasCucoc,rotaCucoc);
  motor.unirNodos(rotaCucoc,rotaCuco2c);
  motor.unirNodos(rotaCuco2c,cucoc);  

  var trasCucod= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCucod= motor.crearRotacion(0,1,0,0);
  var rotaCuco2d= motor.crearRotacion(0,0,1,0);
  var cucod = motor.crearMalla("4.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCucod,rotaCucod);
  motor.unirNodos(trasCucod,rotaCucod);
  motor.unirNodos(rotaCucod,rotaCuco2d);
  motor.unirNodos(rotaCuco2d,cucod);  

  var trasCucoe= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCucoe= motor.crearRotacion(0,1,0,0);
  var rotaCuco2e= motor.crearRotacion(0,0,1,0);
  var cucoe = motor.crearMalla("5.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCucoe,rotaCucoe);
  motor.unirNodos(trasCucoe,rotaCucoe);
  motor.unirNodos(rotaCucoe,rotaCuco2e);
  motor.unirNodos(rotaCuco2e,cucoe);  

  var trasCucof= motor.crearTraslacion(0.0,0.25,-9.0);
  var rotaCucof= motor.crearRotacion(0,1,0,0);
  var rotaCuco2f= motor.crearRotacion(0,0,1,0);
  var cucof = motor.crearMalla("6.obj","mat-avion.json");
  
  motor.unirNodos(escena,trasCucof,rotaCucof);
  motor.unirNodos(trasCucof,rotaCucof);
  motor.unirNodos(rotaCucof,rotaCuco2f);
  motor.unirNodos(rotaCuco2f,cucof);  




  // var trasCubob= motor.crearTraslacion(-4.0,0.15,-7.0);
  // var rotaCubob= motor.crearRotacion(180,1,0,0);
  // var rotaCubo2b= motor.crearRotacion(0,0,1,0);

  // // var trasCubob= motor.crearTraslacion(0.0,0.0,0.0);
  // // var rotaCubob= motor.crearRotacion(0,0,0,0);
  // // var rotaCubo2b= motor.crearRotacion(0,0,0,0);
  // // var cubo = motor.crearMalla("humana.obj","mat-avion.json");

  // motor.unirNodos(escena,trasCubob);
  // motor.unirNodos(trasCubob,rotaCubob);
  // motor.unirNodos(rotaCubob,rotaCubo2b);
  // motor.unirNodos(rotaCubo2b,animation2);


  // var trasCuboc= motor.crearTraslacion(0.0,0.25,-7.0);
  // var rotaCuboc= motor.crearRotacion(180,1,0,0);
  // var rotaCubo2c= motor.crearRotacion(0,0,0,0);


  // motor.unirNodos(escena,trasCuboc);
  // motor.unirNodos(trasCuboc,rotaCuboc);
  // motor.unirNodos(rotaCuboc,rotaCubo2c);
  // motor.unirNodos(rotaCubo2c,animation3);


  // var trasCubod= motor.crearTraslacion(4.0,0.25,-7.0);
  // var rotaCubod= motor.crearRotacion(180,1,0,0);
  // var rotaCubo2d= motor.crearRotacion(0,0,0,0);


  // motor.unirNodos(escena,trasCubod);
  // motor.unirNodos(trasCubod,rotaCubod);
  // motor.unirNodos(rotaCubod,rotaCubo2d);
  // motor.unirNodos(rotaCubo2d,animation4);





  // var trasCuboe= motor.crearTraslacion(8.0,0.25,-7.0);
  // var rotaCuboe= motor.crearRotacion(180,1,0,0);
  // var rotaCubo2e= motor.crearRotacion(0,0,0,0);



  // motor.unirNodos(escena,trasCuboe);
  // motor.unirNodos(trasCuboe,rotaCuboe);
  // motor.unirNodos(rotaCuboe,rotaCubo2e);
  // motor.unirNodos(rotaCubo2e,animation5);


  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log(escena);
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
  console.log('/////////////////////////////////////////////////////');
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



