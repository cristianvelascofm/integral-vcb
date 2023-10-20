import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-registar-asistente',
  templateUrl: './registar-asistente.component.html',
  styleUrls: ['./registar-asistente.component.css']
})
export class RegistarAsistenteComponent {
  constructor(public dialogRef: MatDialogRef<RegistarAsistenteComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
  }
  // private path = 'http://192.168.1.100:5050';
  path = 'http://192.168.130.79:5050';

  asistente = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '10/01/2023',
    genero: 'm', // Establece el valor predeterminado para el género
    tipoDocumento: 'cedula',
    numeroDocumento: '',
    direccion: '',
    celular: '',
    email: '',
    institucion: ''
  };
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  onClickNO(): void {
    this.dialogRef.close();
  }
  registrarAsistente() {

  }
  async onEnter(event: any) {
    if (event.keyCode === 13) { // 13 es el código de tecla para Enter
      try {
        const response = await this.cargarEstudianteId('1007178242');
        const estudiante: any = response.data; // Supongo que el tipo de datos es cualquier cosa, ajústalo según tu estructura de datos
        console.log('Estudiante', estudiante);
        return estudiante;
      } catch (error) {
        console.error('Error al cargar el evento', error);
        throw error;
      }
    }
  }
  async cargarEstudianteId(id: string) {
    const dictSend = {
      accion: 'cargar-estudiante-id',
      id: id
    };
    try {
      const response = await axios.post(this.path, dictSend);
      return response;
    } catch (error) {
      throw error;
    }

  }
}
