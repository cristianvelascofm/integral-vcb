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

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {


  // En el componente LoginPanel
  @Output() usuarioEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() contrasenaEvent: EventEmitter<string> = new EventEmitter<string>();

  usuario = '';
  contrasena = '';
  dictSend: any = {
    accion: 'crear-evento',
    items: {} // Inicializa items como un objeto vacío
  };

  path = 'http://192.168.1.100:5050';
  // path = 'http://192.168.130.79:5050'; #oficina
  respuestaJson: any = {};
  login() {
    if (this.usuario == '' || this.contrasena == '') {
      alert('Debe ingresar todos los campos');
    }
    else {
      this.dictSend['accion'] = "login";
      this.dictSend['items'].usuario = this.usuario;
      this.dictSend['items'].password = this.contrasena;


      // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
      console.log('EVENTO A REGISTRAR:', this.dictSend);

      axios.post(this.path, this.dictSend).then((response) => {
        this.respuestaJson = JSON.stringify(response.data)
        console.log(this.respuestaJson)
        if (this.respuestaJson == '{"error":"USUARIO NO ENCONTRADO"}') {
          alert("Usuario no encontrado")
        } else if (this.respuestaJson == '{"error":"CONTRASEÑAS INVALIDAS"}') {
          alert("Contraseña no coincide")
        } else {
          alert('Bienvenido!')
          this.usuarioEvent.emit(true);
        }

        // return console.log('LOGGED')
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
