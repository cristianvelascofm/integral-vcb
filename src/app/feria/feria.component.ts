import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { RegistarAsistenteComponent } from '../dialogs/registar-asistente/registar-asistente.component';

@Component({
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.scss']
})
export class FeriaComponent {
  ngOnInit(){
    console.log('INICIO DEL CARGUE DE EVENTOS');
    this.dictSend['accion'] = "cargar-evento";
    this.dictSend['nombre-evento'] = "Popayán Ciudad Libro 2023";
    axios.post(this.path, this.dictSend).then((response) => {
      console.log("Respuesta= " + JSON.stringify(response.data));
      alert('Consulta Realizada');
      this.evento = response.data;
      console.log("Nombre Evento: "+typeof(this.evento.actividades));

    })
  }
  constructor(
    public dialog: MatDialog
  ) { }


  // path = 'http://192.168.1.100:5050';
  path = 'http://192.168.130.79:5050';
  //  #oficina

  usuarioLogged = '';
  moderadorActivo = true;


  // ngOnInit():void {

    // this.dictSend['accion'] = "cargar-evento";
    // this.dictSend['nombre-evento'] = "Popayán Ciudad Libro 2023";
    // axios.post(this.path, this.dictSend).then((response) => {
    //   console.log("Respuesta= " + JSON.stringify(response.data));
    //   alert('Consulta Realizada');

    // })

  // }
  columnas: string[] = ['nombre', 'edicion', 'fecha', 'organizador'];
  datos = [];
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  dataSource: any;

  terminoBusqueda: string = '';
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
    categoria: 'Cultural', // Establece el valor predeterminado para el género
    lugar: 'Claustro de Santo Domingo - Universidad del Cauca',
    fechaInicio: '10-22-2023',
    fechaFin: '',
    hora: '05:00 P.M.',
    responsable: 'JORGE VELOSA',
    organizador: '',
    actividades: {
      nombre: 'En Verso y En Prosa Con Velosa',
      categoria: 'Conversatorio',
      fechaInicio: '22-10-2023',
      horaInicio: '05:00 P.M.',
      moderador: 'Carlos Humberto Zapata',
    },
  };

  dictSend: any = {};

  actividades = false;



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
    // this.evento = {
      // nombre: '',
      // edicion: 1,
      // categoria: 'general', // Establece el valor predeterminado para el género
      // lugar: '',
      // fechaInicio: '',
      // fechaFin: '',
      // hora: '',
      // responsable: '',
      // organizador: '',
      // actividades: {
      //   nombre: '',
      //   categoria: '',
      //   fechaInicio: '',
      //   horaInicio: '',
      //   moderador: '',
      // },
    // };
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
  openRegistro() {
    const dialogRef = this.dialog.open(RegistarAsistenteComponent, {
      width: '650px',
      // height: '650px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
