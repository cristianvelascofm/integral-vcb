import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EventService, Evento } from '../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MainPageComponent } from '../main-page/main-page.component';
import { environment } from '../config/config';
import { MatTableDataSource } from '@angular/material/table';
import { Participante } from '../services/persona.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { EventoActividadComponent } from '../dialogs/evento-actividad/evento-actividad.component';
import { RegistarAsistenteComponent } from '../dialogs/registar-asistente/registar-asistente.component';

@Component({
  selector: 'app-bienvenida-estudiantes',
  templateUrl: './bienvenida-estudiantes.component.html',
  styleUrls: ['./bienvenida-estudiantes.component.scss']
})
export class BienvenidaEstudiantesComponent {

  constructor(
    public dialog: MatDialog, private eventService: EventService, private mainPage: MainPageComponent
  ) {
    this.path = environment.apiBaseUrl;
    this.usuarioLogged = environment.getUser();
    this.actividadActual = environment.getActividad();
    this.cargarEventoInformacionInicial();
    // this.categoria_Actividad = this.evento.actividades[0].tipo;


  }

  ngOnInit() {


  }

  @Output() usuarioLoggeado: EventEmitter<string> = new EventEmitter<string>();

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

  // Variables de Control Evento
  nombreEvento = 'none';
  edicionEvento = 0;
  categoriaEvento = 'none';
  lugarEvento= 'none';
  fechaInicioEvento = 'none';
  horaInicioEvento = 'none';
  moderadorEvento = 'none';

  // Variables de Control Actividad
  nombreActividad = 'none';
  categoriaActividad = 'none';
  lugarActividad = 'none'
  fechaActividad = 'none'
  horaActividad = 'none'

  path: string;
  //  #oficina
  actividadesActivas = true;
  usuarioLogged = '';
  moderadorActivo = true;
  invitados = ''

  actividadActual: string;


  columnas: string[] = ['nombre', 'apellido', 'documento', 'institucion'];
  datos: Participante[] = []; // Asegúrate de que la clase 'Participante' esté importada
  dataSource: any
  // @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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



  }

  cargarEventoInformacionInicial() {
    const nombreEvento = 'Inducción a Estudiantes de Primer Semestre'; // Nombre del evento que desea cargar, en esta caso es estático por conveniencia temporal de la prueba piloto
    this.eventService.cargarEvento(nombreEvento)
      .then(evento => {
        this.evento = evento;
        // Init Datos Evento
        this.nombreEvento = evento.nombre;
        this.categoriaEvento = evento.categoria;
        this.edicionEvento = evento.edicion || 0;
        this.lugarEvento = evento.lugar;
        this.fechaInicioEvento = evento.fechaInicio;
        this.horaInicioEvento = evento.horaInicio || "none";
        // Initi Datos Actividad [0]
        this.categoriaActividad= evento.actividades[0].tipo;
        this.lugarActividad = evento.actividades[0].lugar;
        this.fechaActividad = evento.actividades[0].fechaInicio;
        this.horaActividad = evento.actividades[0].horaInicio;
        
        //Imprimir en consola el json de evento
        // console.log('Evento cargado: ', JSON.stringify(this.evento));

        if (this.evento.actividades[0].invitados) {
          const invitadosArray = this.evento.actividades[0].invitados.map(invitado => invitado.nombre);
          const invitadosString = invitadosArray.join(', ');
          this.invitados = invitadosString;
          console.log(this.invitados);
        }else{

        }
        environment.setActividad(this.evento.actividades[0].nombre);
        if (this.evento.actividades[0].asistentes) {

          this.eventService.cargarListadoAsistentesActividad()
            .then(data => {
              this.datos = data;
              this.dataSource = new MatTableDataSource<Participante>(this.datos);
              this.dataSource.paginator = this.paginator;
              console.log(this.paginator)
            })
            .catch(error => {
              console.error(error);
            });
        }

        if ('Error' in this.evento) {
          this.actividadesActivas = false;
        } else {
          this.actividadesActivas = true;
          console.log('Evento cargado:', this.evento);
        }
      })
      .catch(error => {
        this.actividadesActivas = false;
        // console.error('Error al cargar el evento:', error);
      });

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
    // this.usuarioLoggeado.emit(this.usuario)
    const dialogRef = this.dialog.open(RegistarAsistenteComponent, {
      disableClose: true,
      width: '720px',
      // height: '650px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
    })
  }

}

