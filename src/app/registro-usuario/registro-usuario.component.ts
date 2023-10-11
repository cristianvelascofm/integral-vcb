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

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();
  hide = true; // Ocultar/Mostrar Contraseña
  hideConfirm = true;

  usuario = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '10/01/2023',
    genero: 'Masculino', // Establece el valor predeterminado para el género
    tipoDocumento: 'cedula',
    numeroDocumento: '',
    direccion: '',
    celular: '',
    cargo: 'OPS', // Establece el valor predeterminado para el cargo
    dependencia: 'Vicerrectoría', // Establece el valor predeterminado para la dependencia
    email: '',
    usuario: '',
    contrasena: '',
    repetirContrasena: ''
  };

  registrar() {
    // Validar que las contraseñas coincidan antes de enviar el formulario
    if (this.usuario.contrasena !== this.usuario.repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('Datos de registro:', this.usuario);

    // Reiniciar el formulario después de enviarlo
    this.usuario = {
      nombre: '',
      apellido: '',
      fechaNacimiento: '10/01/2023',
      genero: 'Masculino',
      tipoDocumento: 'cedula',
      numeroDocumento: '',
      direccion: '',
      celular: '',
      cargo: 'OPS',
      dependencia: 'Vicerrectoría',
      email: '',
      usuario: '',
      contrasena: '',
      repetirContrasena: ''
    };
  }

}
