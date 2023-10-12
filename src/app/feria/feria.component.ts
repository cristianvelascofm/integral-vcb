import { Component, ElementRef } from '@angular/core';
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
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.scss']
})
export class FeriaComponent {
  path = 'http://192.168.1.100:5050';
  // path = 'http://192.168.130.79:5050'; #oficina


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new ErrorStateMatcher();
  ocultarContrasena = true; // Ocultar/Mostrar Contraseña
  ocultarConfirmarContrasena = true; // Ocultar /
  confirmarContrasena = '';

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

  hide = true;


  evento = {
    nombre: 'POPAYÁN CIUDAD LIBRO 2023',
    edicion: 6,
    categoria: 'CULTURAL', // Establece el valor predeterminado para el género
    lugar: 'Teatro Municipal Guillermo León Valencia',
    fechaInicio: '10/12/2023',
    fechaFin: '',
    hora: '06:15 P.M.',
    responsable: 'JORGE VELOSA',
    organizador: '',
    actividades: {
      nombre: 'En Verso y En Prosa Con Velosa',
      categoria: 'conversatorio'
    },
  };

  dictSend: any = {};

  actividades = false;

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(EventoActividadComponent, {
      width: '550px',
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }


  crearEvento() {

    this.dictSend['accion'] = "crear-evento";
    this.dictSend['items'] = this.evento;

    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('EVENTO A REGISTRAR:', this.dictSend);

    axios.post(this.path, this.dictSend).then((response) => {
      console.log("Respuesta= " + JSON.stringify(response.data));
      alert('EVENTO CREADO');
      this.actividades = true;
      return console.log('EVENTO REGISTRADO CON ÉXITO')
    })


    // Reiniciar el formulario después de enviarlo
    this.evento = {
      nombre: '',
      edicion: 1,
      categoria: 'general', // Establece el valor predeterminado para el género
      lugar: '',
      fechaInicio: '',
      fechaFin: '',
      hora: '',
      responsable: '',
      organizador: '',
      actividades: {
        nombre: '',
        categoria: '',
      },
    };
  }

}
