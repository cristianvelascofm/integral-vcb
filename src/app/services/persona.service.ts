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
  }
  private personas: Persona[] = [];
  path: string;

  // BUSCAR ESTUDIANTE POR ID
  async obtenerEstudianteId(identificacion: string) {
    const dictSend = {
      accion: 'cargar-estudiante-id',
      id: identificacion
    };
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async registrarAsistente(asistente: Asistente, usuario: string) {
    const dictSend = {
      accion: 'registrar-asistente',
      items: asistente,
      id: asistente.identificacion,
      usuario: usuario

    };
    try {
      const response = await axios.post(this.path, dictSend);
      console.log('JAJAU. ',response.data)
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
