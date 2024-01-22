import { Component, Inject, Input } from '@angular/core';
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
import { MainPageComponent } from 'src/app/main-page/main-page.component'
@Component({
  selector: 'app-registar-asistente',
  templateUrl: './registar-asistente.component.html',
  styleUrls: ['./registar-asistente.component.scss']
})


export class RegistarAsistenteComponent {
  constructor(private mainPage: MainPageComponent, private datePipe: DatePipe, private personaService: PersonaService, public dialogRef: MatDialogRef<RegistarAsistenteComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
    this.path = environment.apiBaseUrl
  }
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
  controlColegio: boolean = false;
  fechaFormadetaNacimiento = new Date('');

  // BORRAR LOS CAMPOS AL BORRAR EL NÚMERO DOCUMENTO
  checkNumeroDocumento() {
    if (this.documento.trim() === '') {
      this.borrarCampos()
    }
  }
  institucionControl() {
    if (this.institucion !== 'ninguna') {
      if (this.institucion !== 'colegio') {
        this.controlInstitucion = true;
        this.controlColegio = false;
      } else {
        this.controlInstitucion = false;
        this.controlColegio = true;
      }
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
    // console.log('y AJA')
  }

  confirmarRegistro() {
    const formulario = document.getElementById('registro_asistencia') as HTMLFormElement;
    formulario.dispatchEvent(new Event('submit'));
    console.log(this.asistente['fechaNacimiento']);
    this.asistente['identificacion'] = this.documento;
    const birthday = this.fechaFormadetaNacimiento;
    console.log("ASISTENTE LOCAL: ", this.asistente)
    if (birthday !== undefined) {
      const fechaOriginal = new Date(birthday);
      const fechaFormateada = this.datePipe.transform(fechaOriginal, 'dd-MM-yyyy');
      this.asistente['fechaNacimiento'] = fechaFormateada?.toString()
      const fullName = this.nombreCompleto.split(' ')
      if (fullName[0]) {
        this.asistente['primerNombre'] = fullName[0];
      } else {
        this.asistente['primerNombre'] = "";
      }
      if (fullName[1]) {
        this.asistente['segundoNombre'] = fullName[1];
      } else {
        this.asistente['segundoNombre'] = fullName[1];
      }
      const fullLastName = this.apellidoCompleto.split(' ')
      if (fullLastName[0]) {
        this.asistente['primerApellido'] = fullLastName[0];
      } else {
        this.asistente['primerApellido'] = "";
      }
      if (fullLastName[1]) {
        this.asistente['segundoApellido'] = fullLastName[1];
      } else {
        this.asistente['segundoApellido'] = fullLastName[1];
      }
      if (this.institucion === 'ninguna') {
        this.asistente['institucion'] = '';
        this.asistente['programa'] = '';
        this.asistente['facultad'] = '';
        this.asistente['grado'] = -1;
      }
      // this.usuarioA = this.mainPage.obtenerUsuario();
      // console.log('A VER QP ASA ', this.usuarioA)
      const respuesta = this.personaService.registrarAsistente(this.asistente, this.usuarioA?.toString());
      console.log('Asistente Registrado: ', respuesta);
      alert('REGISTRO EXITOSO');
      this.dialogRef.close();


    }
    else {
      alert('IMPOSIBLE REALIZAR EL REGISTRO');
    }
  }
  // @Input() 
  usuarioA = ''
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
    this.fechaFormadetaNacimiento = new Date('')

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
              const parts = this.asistente['fechaNacimiento']?.split('-');
              if (parts && parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // Resta 1 al mes, ya que en JavaScript los meses van de 0 a 11.
                let year = parseInt(parts[2], 10);

                // Ajusta el año si es menor que 100
                if (year < 100) {
                  // Supongamos que queremos tratar los años menores a 30 como pertenecientes al siglo XXI
                  // y los años mayores o iguales a 30 como pertenecientes al siglo XX.
                  year += (year < 30) ? 2000 : 1900;
                }

                this.fechaFormadetaNacimiento = new Date(year, month, day);

              }
              if (estudiante.codigo !== '') {
                this.institucion = 'universidad' // ESTA ES UNA VARIABLE LOCAL, NO SE ENVÍA AL SERVER PORQUE SOLO SIRVE DE FLAG
                this.asistente['institucion'] = 'Universidad del Cauca'; //Esta línea se agrega porque no tiene institucion por defecto el estudiante unicaucano en el diccionario del server
                var tipoDocumento = this.asistente['tipoDocumento']
                if (tipoDocumento == 'Cédula') {
                  this.asistente['tipoDocumento'] = 'cedula'
                } else if (tipoDocumento == 'Tarjeta de Identidad') {
                  this.asistente['tipoDocumento'] = 'tarjeta'
                }
                this.nombreCompleto = name.toLowerCase().charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                this.apellidoCompleto = lastName.toLowerCase().charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
                this.controlInstitucion = true;

                return estudiante;
              } else {
                this.institucion = 'ninguna'
                this.asistente['institucion'] = ''; //Esta línea se agrega porque no tiene institucion por defecto el estudiante unicaucano en el diccionario del server
                this.asistente['tipoDocumento'] = estudiante.tipoDocumento //Esta línea es porq no conocemos el tipo de Documento
                this.nombreCompleto = name;
                this.apellidoCompleto = lastName;

              }

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
