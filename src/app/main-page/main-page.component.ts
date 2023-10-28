import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../config/config'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear = new Date().getFullYear();
  constructor() {
    this.verificadorLogin();

  }


  // @Output() user: EventEmitter<string> = new EventEmitter<string>();



  logged = false;
  register = false;
  username = ''

  // OBTENGO EL VALOR DE LA CLAVE USUARIO DEL LOCAL STORAGE


  // MÉTODO PARA VERIFICAR SI EL USUARIO ESTA LOGGEADO PREVIAMENTE
  verificadorLogin(): void {
    if (environment.getUser() && environment.getUser() !== '') {
      console.log('** SESIÓN GUARDADA');
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  getCurrentYear() {
    return this.currentYear;
  }

  // MÉTODO QUE OBTIENE VERIFICA SI EXISTE LA CLAVE VALOR EN EL LOCALSTORAGE
  isKeyValue() {


  }

  processLogin(eventData: boolean) {
    if (eventData) {
      this.logged = true
    }else{
      this.logged=false
      alert('Imposible Iniciar Sesión');
    }
  }


  logOut() {
    console.log('bye')
    this.logged = false;
    this.register = false;
  }


  // }

}
