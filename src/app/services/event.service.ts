import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../config/config';
interface Actividad {
  nombre: string;
  fechaInicio: string;
  fechaFin: string,
  horaInicio: string,
  horaFin: string,
  lugar: string,
  tipo: string,
  descripcion?: string,
  invitados?: Participante[],
  asistentes?: Participante[],
  moderadores?: Participante[],
  apoyos?: Participante[],
  souvenir?: Souvenir[],
  registrador?: Registrador[]
}

interface Participante {
  nombre: string;
  apellido?: string;
  cargo?: string;
  email?: string;
  entidad?: string;
  tipoIdentificacion?: string;
  identificacion?: string;
  correo?: string;
  direccion?: string;
  telefono?: string;
  sitioWeb?: string;
}
interface Registrador {
  nombre: string;
  usuario: string;
}
interface Souvenir {
  nombre: string;
  tipo: string;
  precio?: number;
  descripcion?: string;
}

export interface Evento {
  id?: string,
  nombre: string;
  edicion: number;
  categoria: string;
  lugar: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string;
  estado: string;
  organizadores: Participante[]; // Propiedad opcional
  aliados?: Participante[];
  apoyos?: Participante[]; // Propiedad opcional
  patrocinadores?: Participante[]; // Propiedad opcional
  actividades: Actividad[];
}


@Injectable({
  providedIn: 'root'
})
export class EventService {
  static datos: Evento[];
  constructor() {
    this.path= environment.apiBaseUrl
   }

  path: string;
  // CARGAR EVENTO POR NOMBRE 
  cargarEvento(nombreEvento: string, usuarioRegistrador: string): Promise<Evento> {
    const dictSend = {
      accion: 'cargar-evento',
      'nombre-evento': nombreEvento,
      'usuario': usuarioRegistrador
    };
    return axios.post(this.path, dictSend)
      .then(response => {
        const evento: Evento = response.data;
        evento.actividades = evento.actividades || [];
        evento.organizadores = evento.organizadores || [];
        return evento;
      })
      .catch(error => {
        console.error('Error al cargar el evento', error);
        throw error;
      });
  }

  static getEventos() {
    this.datos = [

    ]
    return this.datos
  };

}
