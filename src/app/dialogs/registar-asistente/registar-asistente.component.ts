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

@Component({
  selector: 'app-registar-asistente',
  templateUrl: './registar-asistente.component.html',
  styleUrls: ['./registar-asistente.component.css']
})
export class RegistarAsistenteComponent {
  constructor(public dialogRef: MatDialogRef<RegistarAsistenteComponent>,@Inject(MAT_DIALOG_DATA) public msg: string){
  }
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
  registrarAsistente(){

  }
}
