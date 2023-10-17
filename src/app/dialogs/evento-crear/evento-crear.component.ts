import { Component } from '@angular/core';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog';
import { EventoActividadComponent } from '../evento-actividad/evento-actividad.component';
@Component({
  selector: 'app-evento-crear',
  templateUrl: './evento-crear.component.html',
  styleUrls: ['./evento-crear.component.css']
})
export class EventoCrearComponent {

  constructor(
    public dialog: MatDialog
  ) { }
  path = 'http://192.168.1.100:5050';
  // path = 'http://192.168.130.79:5050'; #oficina

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
  dictSend:any={};

  actividades =false;

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

  openDialog() {
    const dialogRef = this.dialog.open(EventoActividadComponent, {
      width: '550px',
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
