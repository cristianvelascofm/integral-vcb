import { Participante } from "../services/persona.service";

export const environment = {
  production: false,
  // path :'http://192.168.1.100:5050',
  apiBaseUrl: 'http://192.168.0.12:5050', //CASA
  // apiBaseUrl: 'http://192.168.130.79:5050', // OFFICE
  // apiBaseUrl : 'http://192.168.0.11:5050', //PORTATIL

  // SE DEFINE EL SET Y EL GET DEL LOCALSTORAGE DE LA VARIABLE USER
  setUser(username: string) {
    localStorage.setItem('usuario', username);
  },
  getUser(): string {
    let username = localStorage.getItem('usuario');
    if (username !== null) {
      return username;
    }
    return ''
  },

  setActividad(username: string) {
    localStorage.setItem('actividad', username);
  },

  // MÉTODO PARA OBTENER DEL LOCALSTORAGE EL VALOR DE LA PROPIEDAD ACTIVIDAD
  getActividad(): string {
    let actividad = localStorage.getItem('actividad');
    if (actividad !== null) {
      return actividad;
    } else {
      return ''
    }
  },

  setAsistenteSeleccionado(asistente: Participante) {
    var selected = JSON.stringify(asistente)
    localStorage.setItem('asistente-seleccionado', selected);
  },

  getAsistenteSeleccionado():string {
    var asis = localStorage.getItem("asistente-seleccionado");
    if (!asis){return '';}
    return asis;
  },

  eliminarAsistenteSeleccionado():boolean{
    localStorage.removeItem('asistente-seleccionado');
    return true;
  }

  




};