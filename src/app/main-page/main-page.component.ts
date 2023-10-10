import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear = new Date().getFullYear();

  



  logged = false
  register = false

  getCurrentYear() {
    return this.currentYear;
  }



  processLogin(eventData: string) {
    
    // En este ejemplo, simplemente imprimimos el valor en la consola
    console.log('Valor emitido desde login-panel:', eventData);
    this.logged = true;
    this.register = false;
  }


  logOut(){
    console.log('bye')
    this.logged = false;
    this.register = false;
  }


  // }

}
