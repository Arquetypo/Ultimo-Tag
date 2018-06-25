var gl = null;     // WebGL context
var prg = null;    // The program (shaders)
var c_width = 0;   // Variable to store the width of the canvas (updated when needed by codeview.js)
var c_height = 0;  // Variable to store the height of the canvas (updated when needed by codeview.js)

var mvMatrix    = mat4.create();    // The Model-View matrix
var pMatrix     = mat4.create();    // The projection matrix
var nMatrix     = mat4.create();    // The normal matrix
var cMatrix     = mat4.create();    // The camera matrix
var LuzMatrix     = mat4.create();    // The luz matrix

var lucestotales = [];
var rotation = [0,0,0];
var position = [0,0,0];
var Matriz = mat4.create();
mat4.identity(Matriz);
var pila = [];
var coords = -1;
var debug = false;

var COORDS_WORLD = 1;
var COORDS_CAMERA = 2;
var requestUpdate = false;

var updateLightPosition = false;
var updateLightPosition2 = false;

var WEBGLAPP_RENDER = undefined;
var WEBGLAPP_TIMER_ID = -1;
var WEBGLAPP_RENDER_RATE = 500;
