import { Component } from '@angular/core';
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
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {

  path = 'http://192.168.130.79:5050';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();
  hide = true; // Ocultar/Mostrar Contraseña
  hideConfirm = true;
  repetirContrasena = '';

  usuario = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '10/01/2023',
    genero: 'm', // Establece el valor predeterminado para el género
    tipoDocumento: 'cedula',
    numeroDocumento: '',
    direccion: '',
    celular: '',
    cargo: 'ops', // Establece el valor predeterminado para el cargo
    dependencia: 'vcb', // Establece el valor predeterminado para la dependencia
    email: '',
    usuario: '',
    contrasena: '',
  };



  registrar() {
    // Validar que las contraseñas coincidan antes de enviar el formulario
    if (this.usuario.contrasena !== this.repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('USUARIO A REGISTRAR:', this.usuario);

    axios.post(this.path, this.usuario).then((response) => {
      console.log("Respuesta= " + JSON.stringify(response.data));
      return console.log('Registro Exitoso')
    })


    // Reiniciar el formulario después de enviarlo
    this.usuario = {
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      genero: 'm',
      tipoDocumento: 'cedula',
      numeroDocumento: '',
      direccion: '',
      celular: '',
      cargo: 'ops',
      dependencia: 'vcb',
      email: '',
      usuario: '',
      contrasena: '',
    };
  }

}
