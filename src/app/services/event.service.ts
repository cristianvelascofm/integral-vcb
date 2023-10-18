import { Injectable } from '@angular/core';

export interface Evento {
  _id: string;
  nombre: string;
  edicion: number;
  categoria: string;
  fechaInicio: Date;
  fechaFin: Date;
  horaInicio: string;
  descripcion: string;
  organizador: [{}];
  patrocinador: [{}];
  actividades: [{}];
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  static datos: Evento[];
  constructor() { }


  static getEventos() {
    this.datos = [
      {
        _id: '1',
        nombre: 'Bienvenida Estudiantes Primer Semestre 2023-1',
        edicion: 1,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        horaInicio: '6:00 P.M.',
        categoria: 'Académica',
        descripcion: 'Semana de Inducción Estudiantes de Primer Semestre del 2023-1',
        organizador: [{
          nombre: 'Vicerrectoría de Cultura y Bienestar'
        }],
        patrocinador: [{}],
        actividades: [{}],
        estado: 'finalizado',
      }
    ]
    return this.datos
  };

}
