import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoActividadComponent } from '../dialogs/evento-actividad/evento-actividad.component';
import { EventService, Evento } from '../services/event.service';
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
import { MatPaginator } from '@angular/material/paginator';
import { Observable, map, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { EventoCrearComponent } from '../dialogs/evento-crear/evento-crear.component';
import { environment } from '../config/config';

@Component({
  selector: 'app-event-module',
  templateUrl: './event-module.component.html',
  styleUrls: ['./event-module.component.scss']
})
export class EventModuleComponent {

  constructor(public dialog: MatDialog, private eventService: EventService) {
    this.path = environment.apiBaseUrl;
  }
  ngOnInit() {
    this.actualizarFechaHora();
    setInterval(() => {
      this.actualizarFechaHora();
    }, 1000);
    this.filteredOptions = this.mControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // Carga inicial de Datos de las Tablas de Recepción y Documentos VCB
    this.datos = EventService.getEventos();
    this.dataSource = new MatTableDataSource<Evento>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  path: string;
  // path = 'http://192.168.130.79:5050'; #oficina
  filteredOptions: Observable<string[]> | undefined
  mControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  // Tabla Eventos
  // columnas: string[] = [];
  columnas: string[] = ['nombre', 'edicion', 'fecha', 'organizador'];
  datos: Evento[] = [];
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  dataSource: any;

  terminoBusqueda: string = '';
  evento = {
    nombre: 'Popayán Ciudad Libro 2023',
    edicion: '6',
    categoria: 'CULTURAL', // Establece el valor predeterminado para el género
    lugar: 'Claustro Santo Domingo',
    hora: '05:00 p.m.',
    fechaInicio: '10/22/2023',
    fecha: '',
    fechaFin: '',
    responsable: '',
    organizador: {},
    actividades: {},
  };
  fechaHora: string = '';
  dictSend: any = {};

  actividades = false;


  openNuevoEvento() {
    const dialogRef = this.dialog.open(EventoCrearComponent, {
      width: '650px',
      // height: '650px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
  actualizarFechaHora() {
    const now = new Date();
    this.fechaHora = now.toLocaleString();

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
      categoria: 'cultural', // Establece el valor predeterminado para el género
      lugar: '',
      fechaInicio: '',
      fecha: '',
      hora: '',
      fechaFin: '',
      responsable: '',
      organizador: '',
      actividades: {},
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != '') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  }
  cleanSearchReception() {
    this.terminoBusqueda = '';
    this.dataSource.filter = this.terminoBusqueda.trim();
  }


}



