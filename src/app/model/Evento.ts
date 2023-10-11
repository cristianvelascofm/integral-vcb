export class Evento {
    // Propiedad para almacenar el id
    // public id: number;

    // Constructor de la clase con un id generado automáticamente
    constructor(

        public nombre: string,
        public numeroEdicion: string,
        public categoría: string,
        public lugarRelización: string,
        public fechaInicio: Date,
        public fechaFin: Date,
        public responsable: string,
        public organizador: string,
        public actividades:{},
        

    ) {
        // Generar un id único automáticamente (por ejemplo, usando un timestamp)
        // this.id = new Date().getTime();
    }
}
