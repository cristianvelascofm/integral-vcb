import { Persona } from "./Persona";

export class Usuario extends Persona {
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
      public institucion: string,
      public dependencia: string,
      public cargo: string,
      public estado: string,
      public usuario: string,
      public password: string,
      public contrato: string | undefined,
      public supervisor: Usuario | undefined
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
  