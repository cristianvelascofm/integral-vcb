import { Persona } from "./Persona";

export class Estudiante extends Persona {
    constructor(
        identificacion: string,
        tipoDocumento: string,
        primerApellido: string,
        segundoApellido: string,
        primerNombre: string,
        segundoNombre: string | undefined,
        genero: string,
        fechaNacimiento: string,
        emailPersonal: string | undefined,
        telefono: string | undefined,
        ciudad: string | undefined,
        direccion: string | undefined,
        public codigo: string | undefined,
        public emailInstitucional: string | undefined,
        public institucion: string | undefined,
        public facultad: string | undefined,
        public programa: string | undefined,
        public semestre: number | undefined,
        public grado: number | undefined,
        public regionalizacion: string | undefined,
        public sede: string | undefined,
        public jornada: string | undefined,
        public periodo: string | undefined,
        public estado: string | undefined
    ) {
        super(
            identificacion,
            tipoDocumento,
            primerApellido,
            segundoApellido,
            primerNombre,
            segundoNombre,
            genero,
            fechaNacimiento,
            emailPersonal,
            telefono,
            ciudad,
            direccion
        );
    }
}
