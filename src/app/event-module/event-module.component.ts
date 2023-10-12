import { Component, ElementRef  } from '@angular/core';
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
  constructor(
    public dialog: MatDialog
  ){}

  openDialog(){
    const dialogRef =  this.dialog.open(EventoActividadComponent,{
      width: '350px',
      data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe( res =>{
      console.log(res)
    })
  }

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
  crearEvento(){

  }
}



