import { Injectable } from '@angular/core';

export interface DocumentVCB {
  id?: string;
  fecha_recepcion: string;
  funcionario_recepcion: string;
  asunto: string;
  remitente: string;
  emisor: string;
  fecha_actividad: Date;
  archivo: File;
  observacion: string;
}



@Injectable({
  providedIn: 'root'
})


export class DocumentVcbService {
  static datos: DocumentVCB[];
  constructor() { }

  static getDocumentosVCB() {

    this.datos = [
      {
        id: "1",
        fecha_recepcion: "2023-01-05",
        funcionario_recepcion: "Cristian Velasco",
        asunto: "Informe de actividades",
        remitente: "Universidad del Cauca",
        emisor: "Nombre del Emisor 1",
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: "Lorem ipsum dolor sit amet 1",
      },
      {
        id: "2",
        fecha_recepcion: "2023-02-10",
        funcionario_recepcion: "Socorro Fajardo",
        asunto: "Solicitud de financiamiento",
        remitente: "Universidad del Cauca",
        emisor: "Nombre del Emisor 2",
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: "Lorem ipsum dolor sit amet 2",
      },
      {
        id: "3",
        fecha_recepcion: "2023-03-15",
        funcionario_recepcion: "Clara Gómez",
        asunto: "Programa de eventos",
        remitente: "Universidad del Cauca",
        emisor: "Nombre del Emisor 3",
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: "Lorem ipsum dolor sit amet 3",
      },
      {
        id: "4",
        fecha_recepcion: "2023-04-20",
        funcionario_recepcion: "Vicerrectoría de Cultura y Bienestar",
        asunto: "Convocatoria de artistas",
        remitente: "Universidad del Cauca",
        emisor: "Nombre del Emisor 4",
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: "Lorem ipsum dolor sit amet 4",
      },
      {
        id: "5",
        fecha_recepcion: "2023-05-25",
        funcionario_recepcion: "Vicerrectoría de Cultura y Bienestar",
        asunto: "Informe de gestión cultural",
        remitente: "Universidad del Cauca",
        emisor: "Nombre del Emisor 5",
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: "Lorem ipsum dolor sit amet 5",
      },

      {
        id: 'a',
        fecha_recepcion: '2022-01-01',
        funcionario_recepcion: 'Juan Dela Cruz',
        asunto: 'Asunto Test',
        remitente: 'Juan Dela Cruz',
        emisor: 'Juan Dela Cruz',
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: 'Observacion Test'


      },
      {
        id: 'b',
        fecha_recepcion: '2023-01-01',
        funcionario_recepcion: 'Juan Dela Cruz',
        asunto: 'Asunto Test',
        remitente: 'Juan Dela Cruz',
        emisor: 'Juan Dela Cruz',
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: 'Observacion Test'
      },
      {
        id: 'c',
        fecha_recepcion: '2020-01-01',
        funcionario_recepcion: 'Juan Dela Cruz',
        asunto: 'Asunto Test',
        remitente: 'Juan Dela Cruz',
        emisor: 'Juan Dela Cruz',
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: 'Observacion Test'
      },

      {
        id: 'd',
        fecha_recepcion: '2021-23-11',
        funcionario_recepcion: 'Juan Dela Cruz',
        asunto: 'Asunto Test',
        remitente: 'Juan Dela Cruz',
        emisor: 'Juan Dela Cruz',
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: 'Observacion Test'


      },

      {
        id: 'e',
        fecha_recepcion: '2020-21-06',
        funcionario_recepcion: 'Juan Dela Cruz',
        asunto: 'Asunto Test',
        remitente: 'Juan Dela Cruz',
        emisor: 'Juan Dela Cruz',
        fecha_actividad: new Date(),
        archivo: new File([''], 'archivo.pdf', { type: 'application/pdf' }),
        observacion: 'Observacion Test'


      },

    ]
    return this.datos
  }
}
