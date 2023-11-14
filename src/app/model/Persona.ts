export class Persona {
    constructor(
      public identificacion: string,
      public tipoDocumento: string,
      public primerApellido: string,
      public segundoApellido: string,
      public primerNombre: string,
      public segundoNombre: string | undefined,
      public genero: string,
      public fechaNacimiento: string,
      public emailPersonal: string | undefined,
      public telefono: string | undefined,
      public ciudad: string | undefined,
      public direccion: string | undefined
    ) {}
 
  }
  