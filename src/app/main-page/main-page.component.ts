import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear = new Date().getFullYear();

  



  logged = true
  register = false

  getCurrentYear() {
    return this.currentYear;
  }



  processLogin(eventData: boolean) {
    console.log('Valor emitido desde login-panel:', eventData);
    if (eventData == true){
      this.logged = true
    }
  }


  logOut(){
    console.log('bye')
    this.logged = false;
    this.register = false;
  }


  // }

}
