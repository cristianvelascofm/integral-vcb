import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrls: ['./principal-menu.component.scss']
})
export class PrincipalMenuComponent {
  
  @Output()
  menuSelector: EventEmitter <string> = new EventEmitter <string>();
  

//MÉTODO QUE ELIMKINA LA PROPIEDAD usuario DEL LOCALSTORAGE
logout(){
  localStorage.removeItem('usuario');
  localStorage.removeItem('actividad');

}

  changeWindow(window: string){
    this.menuSelector.emit(window);
    if(window==='admin'){
      this.logout()
    }
  }

}
