import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona, Usuario, Participante, Estudiante, Asistente, PersonaService } from 'src/app/services/persona.service';
import axios from 'axios';
import { environment } from 'src/app/config/config';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registar-asistente',
  templateUrl: './registar-asistente.component.html',
  styleUrls: ['./registar-asistente.component.css']
})

export class RegistarAsistenteComponent {
  constructor(private datePipe: DatePipe, private personaService: PersonaService, public dialogRef: MatDialogRef<RegistarAsistenteComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
    this.path = environment.apiBaseUrl
  }
  // private path = 'http://192.168.1.100:5050';
  path: string;

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
  };



  nombreCompleto = '';
  apellidoCompleto = '';
  documento = '';
  institucion = 'ninguna';
  controlInstitucion: boolean = false;

  // BORRAR LOS CAMPOS AL BORRAR EL NÚMERO DOCUMENTO
  checkNumeroDocumento() {
    if (this.documento.trim() === '') {
      this.borrarCampos()
    }
  }
  institucionControl() {
    if (this.institucion !== 'ninguna') {
      this.controlInstitucion = true;
    } else {
      this.controlInstitucion = false;
    }
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  onClickNO(): void {
    this.dialogRef.close();
  }


  registrarAsistente() {
    console.log('y AJA')
  }

  confirmarRegistro() {
    const formulario = document.getElementById('registro_asistencia') as HTMLFormElement;
    formulario.dispatchEvent(new Event('submit'));
    console.log(this.asistente['fechaNacimiento']);
    const birthday = this.asistente['fechaNacimiento'];

    if (birthday !== undefined) {
      const fechaOriginal = new Date(birthday);
      const fechaFormateada = this.datePipe.transform(fechaOriginal, 'dd-MM-yyyy');
      this.asistente['fechaNacimiento'] = fechaFormateada?.toString()
      console.log('Fecha: ' + fechaFormateada); // Esto imprimirá: "por ejemplo: 11-10-2023"
      const respuesta = this.personaService.registrarAsistente(this.asistente);
      console.log(respuesta);
    }
    else {
    }
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
    this.institucion = 'ninguna';
    this.controlInstitucion = false;

  }


  // BUSCA A LA PERSONA AL OPRIMIR LA TECLA ENTER EN EL CAMPO DE IDENTIFICACIÓN
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
              this.institucion = 'universidad'
              this.asistente['institucion'] = 'Universidad del Cauca';
              this.asistente['tipoDocumento'] = 'cedula'
              this.nombreCompleto = name;
              this.apellidoCompleto = lastName;
              this.controlInstitucion = true;
              return estudiante;
            }
          } else {
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
