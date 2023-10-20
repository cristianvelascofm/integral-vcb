import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona, Usuario, Participante, Estudiante, Asistente, PersonaService } from 'src/app/services/persona.service';
import axios from 'axios';

@Component({
  selector: 'app-registar-asistente',
  templateUrl: './registar-asistente.component.html',
  styleUrls: ['./registar-asistente.component.css']
})
export class RegistarAsistenteComponent {
  constructor(private personaService: PersonaService, public dialogRef: MatDialogRef<RegistarAsistenteComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
  }
  // private path = 'http://192.168.1.100:5050';
  path = 'http://192.168.130.79:5050';

  asistente: Asistente = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    ciudad: '',
    codigo: '',
    direccion: '',
    emailInstitucional: '',
    emailPersonal: '',
    estado: '',
    facultad: '',
    fechaNacimiento: '',
    genero: '',
    grado: 0,
    identificacion: '',
    tipoDocumento: '',
    institucion: '',
    jornada: '',
    periodo: '',
    programa: '',
    regionalizacion: '',
    sede: '',
    semestre: 0,
    sitioWeb: '',
    telefono: ''
  }

  nombreCompleto = ''
  apellidoCompleto = ''
  documento = ''

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  onClickNO(): void {
    this.dialogRef.close();
  }
  registrarAsistente() {




  }

  borrarCampos() {
    this.asistente = {
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      ciudad: '',
      codigo: '',
      direccion: '',
      emailInstitucional: '',
      emailPersonal: '',
      estado: '',
      facultad: '',
      fechaNacimiento: '',
      genero: '',
      grado: 0,
      identificacion: '',
      tipoDocumento: '',
      institucion: '',
      jornada: '',
      periodo: '',
      programa: '',
      regionalizacion: '',
      sede: '',
      semestre: 0,
      sitioWeb: '',
      telefono: ''
    }
    // this.documento = '';
    this.nombreCompleto = '';
    this.apellidoCompleto = '';
  }
  async onEnter(event: any) {
    if (event.keyCode === 13) { // 13 es el código de tecla para Enter
      
      if (this.documento !== '') {
        try {
          const respuesta = await this.personaService.obtenerEstudianteId(this.documento);
          const estudiante: any = respuesta.data;
          this.asistente = estudiante;
          if (!estudiante['accion']) {


            const name = this.asistente['primerNombre']?.toString() + ' ' + this.asistente['segundoNombre']?.toString()
            const lastName = this.asistente['primerApellido']?.toString() + ' ' + this.asistente['segundoApellido']?.toString()
            console.log('Estudiante', estudiante);
            if (name !== undefined && lastName !== undefined) {
              this.asistente['institucion'] = 'Universidad del Cauca';
              this.asistente['tipoDocumento'] = 'cedula'
              this.nombreCompleto = name;
              this.apellidoCompleto = lastName;
              return estudiante;
            }
          }else{
            this.borrarCampos();
          }


        } catch (error) {
          console.error('Error al cargar el Estudiante', error);
          throw error;
        }
      }
    }
  }
}
