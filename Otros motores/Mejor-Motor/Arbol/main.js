function main () {

	pila = [];
	Matriz = mat4.create();
	mat4.identity(Matriz);
	tam = 18;
	nodPadre = new Nodo();
	//agrego 3 hijos al padre
	malla1 = new Malla();
	trans1 = new Transformacion();
	trans2 = new Transformacion();
	trans3 = new Transformacion();
	trans4 = new Transformacion();

	trans2.rotar(-75, 2, 2 ,1);
	trans1.trasladar(5,5,6);
	trans3.trasladar(-4,-4,-5);
	trans4.rotar(75,2,2,1);

	//Objetivo
	// Padre -> nodTrans1 -> NodTrans2 -> Malla
	// 					  -> NodTrans3 -> Malla
	//		 -> NodTrans4 -> Malla
	nodTrans1 = nodPadre.addHijo()
	nodTrans1.setEntidad(trans1);
	nodTrans2 = nodTrans1.addHijo();
	nodTrans2.setEntidad(trans2);
	nodTrans2.addHijo().setEntidad(malla1);
	nodTrans3 = nodTrans1.addHijo();
	nodTrans3.setEntidad(trans3);
	nodTrans3.addHijo().setEntidad(malla1);

	nodTrans4 = nodPadre.addHijo();
	nodTrans4.setEntidad(trans1);
	nodTrans4.addHijo().setEntidad(malla1);
	nodPadre.drawImprime();

}