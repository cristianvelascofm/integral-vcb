import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoActividadComponent } from '../dialogs/evento-actividad/evento-actividad.component';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { environment } from '../config/config';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {

  constructor() {
    this.path = environment.apiBaseUrl;

  }
  // En el componente LoginPanel
  @Output() usuarioEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() usuarioLoggeado: EventEmitter<string> = new EventEmitter<string>();

  usuario = '';
  contrasena = '';
  dictSend: any = {
    accion: 'crear-evento',
    items: {} // Inicializa items como un objeto vacío
  };

  path: string;
  respuestaJson: any = {};

  // USO LOCAL STORAGE PARA ALMACENAR USUARIO

  setlocalStorage() {
    localStorage.setItem('usuario', this.usuario);
  }



  // MÉTODO QUE INICIA SESIÓN
  login() {
    if (this.usuario == '' || this.contrasena == '') {
      alert('Debe ingresar todos los campos');
    }
    else {
      this.dictSend['accion'] = "login";
      this.dictSend['items'].usuario = this.usuario;
      this.dictSend['items'].password = this.contrasena;
      axios.post(this.path, this.dictSend).then((response) => {
        this.respuestaJson = JSON.stringify(response.data)
        console.log(this.respuestaJson)
        if (this.respuestaJson == '{"error":"user"}') {
          alert("Usuario no encontrado")
        } else if (this.respuestaJson == '{"error":"password"}') {
          alert("Contraseña no coincide")
        } else {
          alert('Bienvenido!')
          environment.setUser(this.usuario);
          this.usuarioEvent.emit(true);
        }
      })
    }



  }
  // login(){
  //   // const usuario: string = 'Atlante'
  //   this.usuarioEvent.emit(this.usuario);
  //   this.contrasenaEvent.emit(this.contrasena);
  //   console.log('click ' + this.usuario+' - '+this.contrasena)
  // }


}
