import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  home = true;
  document = false;

// Control de la Vista de Módulos (Navegación de vistas de Páginas)
  pageControl(page:string){
    if(page==='home'){
      this.home=true;
      this.document=false;
    }
    if(page==='document'){
      this.document=true;
      this.home=false;
    }
  }

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
      default:
        // Manejo para un valor no válido de selector
        break;
    }
    
    

  }
}
