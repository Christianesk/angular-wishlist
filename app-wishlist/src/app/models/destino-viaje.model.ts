export class DestinoViajeModel{

    nombre:string;
    imagenUrl:string;
    descripcion:string;

    constructor(n:string,u:string,d:string){
        this.nombre = n;
        this.imagenUrl=u;
        this.descripcion=d;
    }
}