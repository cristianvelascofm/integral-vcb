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
  selector: 'app-event-module',
  templateUrl: './event-module.component.html',
  styleUrls: ['./event-module.component.scss']
})
export class EventModuleComponent {
  path = 'http://192.168.130.79:5050';

  evento = {
    nombre: '',
    edicion: '',
    categoria: 'general', // Establece el valor predeterminado para el género
    lugar: '',
    fechaInicio: '',
    fechaFin: '',
    responsable: '',
    organizador: '',
    actividades: {},
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
      edicion: '',
      categoria: 'general', // Establece el valor predeterminado para el género
      lugar: '',
      fechaInicio: '',
      fechaFin: '',
      responsable: '',
      organizador: '',
      actividades: {},
    };
  }

}



