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
import { Evento, EventService } from '../services/event.service';
import { environment } from '../config/config';
@Component({
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.scss']
})
export class FeriaComponent implements OnInit {

  ngOnInit() {
    const nombreEvento = 'Popayán Ciudad Libro 2023'; // Nombre del evento que deseas cargar
    const usuario = 'sfajardo'
    this.eventService.cargarEvento(nombreEvento, usuario)
      .then(evento => {
        this.evento = evento;
        if ('Error' in this.evento) {
          this.actividadesActivas = false;
        } else {
          this.actividadesActivas = true;
          console.log('Evento cargado:', this.evento);
        }

      })
      .catch(error => {
        this.actividadesActivas = false;
        console.error('Error al cargar el evento:', error);
      });
  }
  constructor(
    public dialog: MatDialog, private eventService: EventService
  ) {
    this.path = environment.apiBaseUrl;
  }

  path: string;
  //  #oficina
  actividadesActivas = false;
  usuarioLogged = '';
  moderadorActivo = true;
  evento: Evento = {
    id: '',
    nombre: '',
    edicion: 0,
    categoria: '',
    lugar: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    horaInicio: '',
    estado: '',
    organizadores: [{
      nombre: "",
      apellido: "",
      cargo: "",
      email: "",
      entidad: "",
      tipoIdentificacion: "",
      identificacion: "",
      correo: "",
      direccion: "",
      telefono: "",
      sitioWeb: "",
    }], // Propiedad opcional
    aliados: [{
      nombre: '',
    }],
    apoyos: [{
      nombre: ''
    }], // Propiedad opcional
    patrocinadores: [{
      nombre: ''
    }], // Propiedad opcional
    actividades: [{
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      horaInicio: '',
      horaFin: '',
      lugar: '',
      tipo: '',
      descripcion: '',
      invitados: [{
        nombre: ''
      }],
      asistentes: [{
        nombre: ''
      }],
      moderadores: [{
        nombre: ''
      }],
      apoyos: [{
        nombre: ''
      }],
      souvenir: [],
      registrador: [{
        nombre: '',
        usuario: ''
      }]
    }],
  };

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


  // evento = {
  //   nombre: 'POPAYÁN CIUDAD LIBRO 2023',
  //   edicion: 6,
  //   categoria: 'Cultural', // Establece el valor predeterminado para el género
  //   lugar: 'Claustro de Santo Domingo - Universidad del Cauca',
  //   fechaInicio: '10-22-2023',
  //   fechaFin: '',
  //   hora: '05:00 P.M.',
  //   responsable: 'JORGE VELOSA',
  //   organizador: '',
  //   actividades: {
  //     nombre: 'En Verso y En Prosa Con Velosa',
  //     categoria: 'Conversatorio',
  //     fechaInicio: '22-10-2023',
  //     horaInicio: '05:00 P.M.',
  //     moderador: 'Carlos Humberto Zapata',
  //   },
  // };

  dictSend: any = {};

  actividades = false;



  openDialog() {
    const dialogRef = this.dialog.open(EventoActividadComponent, {
      disableClose: true,
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
      disableClose: true,
      width: '650px',
      // height: '650px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
