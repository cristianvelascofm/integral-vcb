import { Persona } from "./Persona";

export class Participante extends Persona {
    //constructor
    constructor(identificacion: string,
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
        public sitioWeb?: string | undefined
    ) {
        super(identificacion, tipoDocumento, primerApellido, segundoApellido, primerNombre,
            segundoNombre, genero, fechaNacimiento, emailPersonal, telefono, ciudad, direccion);

    }


}