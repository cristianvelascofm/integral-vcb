export const environment = {
  production: false,
  // path :'http://192.168.1.100:5050',
  // apiBaseUrl : 'http://192.168.130.79:5050',

  apiBaseUrl: 'http://192.168.1.100:5050', // La URL de tu servidor backend

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
  }




};