import { Injectable } from '@angular/core';
import { environment } from '../config/config';
import axios from 'axios';
export interface Documento {
  trd?: string;
  fechaDocumento: string;
  remitente: string;
  destinatario: string;
  asunto: string;
  archivo: File;
  ubicacion?: string;
  estado: string;
  usuario?: string;
}

export interface DocumentoRecepcion extends Documento {
  fechaRecepcion: string;
  tipoRemitente?: string;
}

export interface DocumentoVCB extends Documento {
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor() {
    this.path = environment.apiBaseUrl;
    this.username = environment.getUser();
  }

  path: string;
  username: string 



  async recepcionDocumento(documento: DocumentoRecepcion) {
    documento.usuario = this.username;
    const dictSend = {
      accion: 'recepcion-documento',
      items: documento,
      usuario: documento.usuario,
    }
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async documentoVCB(documento: DocumentoVCB) {
    documento.usuario = this.username;
    const dictSend = {
      accion: 'recepcion-documento',
      items: documento,
      usuario: documento.usuario,
    }
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }
  }

}
