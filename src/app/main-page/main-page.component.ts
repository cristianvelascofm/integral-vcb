import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear = new Date().getFullYear();
  constructor(private location: Location){
    this.verificadorLogin();
    
  }

  // @Output() user: EventEmitter<string> = new EventEmitter<string>();


  usuarioLoggeado = '';
  logged = false;
  register = false;

  // OBTENGO EL VALOR DE LA CLAVE USUARIO DEL LOCAL STORAGE
  getUserLocalStorage() {
    return localStorage.getItem("usuario") as string;
  }

  // MÉTODO PARA VERIFICAR SI EL USUARIO ESTA LOGGEADO PREVIAMENTE
  verificadorLogin(): void {
    if (this.getUserLocalStorage()) {
      console.log('** SESIÓN GUARDADA');
      this.logged=true;
    }else{
      this.logged= false;
      this.location.go(this.location.path());
    }
  }

  getCurrentYear() {
    return this.currentYear;
  }

// MÉTODO QUE OBTIENE VERIFICA SI EXISTE LA CLAVE VALOR EN EL LOCALSTORAGE
isKeyValue() {


}


 obtenerUsuario(){
  console.log('ACASASDASDASDASWSq:',this.usuarioLoggeado)
  return this.usuarioLoggeado;
}

  processLogin(eventData: string) {
    
    if (eventData !== '') {
      this.logged = true
      this.usuarioLoggeado = eventData;
      console.log('** USUARIO:', this.usuarioLoggeado);
    }
  }


  logOut() {
    console.log('bye')
    this.logged = false;
    this.register = false;
  }


  // }

}
