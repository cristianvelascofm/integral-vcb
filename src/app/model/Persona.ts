export class Persona {
    // Propiedad para almacenar el id
    public id: number;

    // Constructor de la clase con un id generado automáticamente
    constructor(
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public genero: string,
        public tipoDocumento: string,
        public numeroDocumento: string,
        public direccion: string,
        public celular: string,
        public cargo: string,
        public dependencia: string,
        public email: string,
        public usuario: string,
        public contrasena: string,
    ) {
        // Generar un id único automáticamente (por ejemplo, usando un timestamp)
        this.id = new Date().getTime();
    }
}
