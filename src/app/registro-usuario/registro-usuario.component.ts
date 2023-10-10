import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  usuario = {
    nombre: '',
    apellido: '',
    direccion: '',
    fechaNacimiento: '',
    genero: '',
    email: '',
    contrasena: '',
    dependencia: 'Vicerrectoría de Cultura y Bienestar',
    celular: '',
    repetirContrasena: ''
    
  };

  registrar() {
    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('Datos de registro:', this.usuario);
    // Reinicia el formulario
    this.usuario = {
      nombre: '',
      apellido: '',
      direccion: '',
      fechaNacimiento: '',
      genero: '',
      email: '',
      contrasena: '',
      dependencia: 'Vicerrectoría de Cultura y Bienestar',
      celular:'', 
      repetirContrasena: ''

    };
  }
}
