import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear = new Date().getFullYear();

  // @Output() user: EventEmitter<string> = new EventEmitter<string>();


  usuarioLoggeado = '';
  logged = false;
  register = true;

  getCurrentYear() {
    return this.currentYear;
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
