import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {

  // user : string = 'Atlante';

// En el componente LoginPanel
@Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();


  login(){
    const usuario: string = 'Atlante'
    this.loginEvent.emit(usuario);
    console.log('click ' + usuario)
  }


}
