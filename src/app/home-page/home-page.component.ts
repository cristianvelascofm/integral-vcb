import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  home = false;
  document = false;
  feria = true;
constructor(private location: Location){

}

  // Control de la Vista de Módulos (Navegación de vistas de Páginas)
  actualWindow(selector :string){
    switch (selector) {
      case 'home':
        this.home = true;
        this.document = false;
        break; // Agregar break para evitar la ejecución del siguiente caso
      case 'document':
        this.document = true;
        this.home = false;
        break; // Agregar break aquí también
      case 'admin':
       
        this.feria = false;
        this.location.go(this.location.path());
        alert('Sesión Finalizada');
      break;
      default:
        // Manejo para un valor no válido de selector
        break;
    }
    
    

  }
}
