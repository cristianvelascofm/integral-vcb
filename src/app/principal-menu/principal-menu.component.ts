import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrls: ['./principal-menu.component.scss']
})
export class PrincipalMenuComponent {
  
  @Output()
  menuSelector: EventEmitter <string> = new EventEmitter <string>();
  


  changeWindow(window: string){
    this.menuSelector.emit(window);
  }

}
