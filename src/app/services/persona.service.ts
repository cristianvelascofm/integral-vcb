import { Injectable } from '@angular/core';
// import { Persona } from '../model/Persona'; // Asegúrate de tener la ruta correcta hacia tu clase Persona
import axios from 'axios';
import { environment } from '../config/config';
export interface Persona {
  identificacion?: string;
  tipoDocumento?: string;
  primerApellido?: string;
  segundoApellido?: string;
  primerNombre?: string;
  segundoNombre?: string;
  genero?: string;
  fechaNacimiento?: string;
  emailPersonal?: string;
  telefono?: string;
  ciudad?: string;
  direccion?: string;
}

export interface Estudiante extends Persona {
  codigo?: string;
  emailInstitucional?: string;
  institucion?: string;
  facultad?: string;
  programa?: string,
  semestre?: number;
  grado?: number;
  regionalizacion?: string;
  sede?: string;
  jornada?: string;
  periodo?: string;
  estado?: string
}

export interface Usuario extends Persona {
  institucion: string;
  dependencia: string;
  cargo: string;
  estado: string;
  usuario: string;
  password: string;
  contrato?: string;
  supervisor?: Usuario;
}

export interface Participante extends Estudiante {
  sitioWeb?: string;
}

export interface Asistente extends Estudiante {
  sitioWeb?: string
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor() {
    this.path = environment.apiBaseUrl;
    this.username = environment.getUser();
    this.actividadActual = environment.getActividad();
  }

  username: string
  actividadActual: string;


  private personas: Persona[] = [];
  path: string;


  async obtenerEstudianteIdConfirmacion(identificacion: string) {
    const dictSend = {
      // accion: 'cargar-estudiante-id',
      accion: 'info-pre-registro',
      id: identificacion,
      actividad: this.actividadActual
    };
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }


  // BUSCAR ESTUDIANTE POR ID
  async obtenerEstudianteId(identificacion: string) {
    const dictSend = {
      // accion: 'cargar-estudiante-id',
      accion: 'cargar-estudiante-id-primer-semestre',
      id: identificacion
    };
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // OBTENER TODOS LOS ASISTENTE SEGÚN LA ACTIVIDAD DE UN EVENTO
  async obtenerAsistentesActividad(nombreEvento: string, nombreActividad: string) {
    const dictSend = {
      accion: 'cargar-estudiante-id',
      evento: nombreEvento,
      actividad: nombreActividad
    };
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registrarAsistente(asistente: Asistente, usuario: string, agenda: boolean, potilito: boolean) {
    var dictSend = {
      second: 'registrar-estudiante-primer-semestre',
      accion: 'registrar-asistente-',
      items: asistente,
      id: asistente.identificacion,
      usuario: this.username,
      'nombre-actividad': this.actividadActual,
      entregable: {
        "agenda": agenda,
        "botilito": potilito
      }
    };


    try {
      const response = await axios.post(this.path, dictSend);
      console.log('JAJAU. ', response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async cargarEntregables(asistente: Asistente) {
    var dictSend = {
      accion: 'cargar-entregables',
      items: asistente,
      id: asistente.identificacion,
      usuario: this.username,
      'nombre-actividad': this.actividadActual,
    };
    try {
      const response = await axios.post(this.path, dictSend);
      console.log('JAJAU. ', response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para agregar una nueva persona
  agregarPersona(persona: Persona): void {
    this.personas.push(persona);
  }




  // Método para obtener la lista de personas
  obtenerPersonas(): Persona[] {
    return this.personas;
  }

  // Método para obtener una persona por su ID
  obtenerPersonaPorId(id: string): Persona | undefined {
    return this.personas.find(persona => persona.identificacion === id);
  }

  // Método para actualizar los detalles de una persona
  actualizarPersona(persona: Persona): void {
    const index = this.personas.findIndex(p => p.identificacion === persona.identificacion);
    if (index !== -1) {
      this.personas[index] = persona;
    }
  }

  // Método para eliminar una persona por su ID
  eliminarPersona(id: string): void {
    const index = this.personas.findIndex(persona => persona.identificacion === id);
    if (index !== -1) {
      this.personas.splice(index, 1);
    }
  }
}
