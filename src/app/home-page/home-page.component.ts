import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  home = false;
  document = true;

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
}
