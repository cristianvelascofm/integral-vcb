import { Component, ElementRef } from '@angular/core';
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
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {

  constructor(private elementRef: ElementRef) {
    this.path = environment.apiBaseUrl;
  }
  path: string;
  // path = 'http://192.168.130.79:5050'; #oficina

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();
  ocultarContrasena = true; // Ocultar/Mostrar Contraseña
  ocultarConfirmarContrasena = true; // Ocultar /
  confirmarContrasena = '';

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

  hide = true;


  focusConfirmar(): void {
    const confirmarInput: HTMLElement = this.elementRef.nativeElement.querySelector('#repetirContrasena');
    confirmarInput.focus();
  }

  registrar() {
    // Validar que las contraseñas coincidan antes de enviar el formulario
    if (this.usuario.contrasena !== this.confirmarContrasena) {
      console.log(this.usuario.contrasena + ' - ' + this.confirmarContrasena)
      alert('Las contraseñas no coinciden.');
      return;
    }


    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('USUARIO A REGISTRAR:', this.usuario);
    let dictSend={
      items: this.usuario,
      accion: 'crear-usuario'
    }
    axios.post(this.path, dictSend).then((response) => {
      console.log("Respuesta= " + JSON.stringify(response.data));
      alert('CUENTA CREADA')
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
