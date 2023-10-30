import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject, of } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentReception, DocumentReceptionService } from '../services/document-reception.service';
import { DocumentVCB, DocumentVcbService } from '../services/document-vcb.service';
import { MatDialog } from '@angular/material/dialog';
import { EventoActividadComponent } from '../dialogs/evento-actividad/evento-actividad.component';
import { DocumentoRecepcionComponent } from '../dialogs/documento-recepcion/documento-recepcion.component';

@Component({
  selector: 'app-document-module',
  templateUrl: './document-module.component.html',
  styleUrls: ['./document-module.component.scss']
})
export class DocumentModuleComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal, private documentReceptionService: DocumentReceptionService, private documentVcbService: DocumentVcbService, public dialog:MatDialog) {
    config.backdrop = 'static';
    config.keyboard = false;
    
    
  }


  private _filtered(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    console.log('paginator', this.paginator)
    this.actualizarFechaHora();
    setInterval(() => {
      this.actualizarFechaHora();
    }, 1000);
    this.filteredOptions = this.mControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // Carga inicial de Datos de las Tablas de Recepción y Documentos VCB
    this.datos = DocumentReceptionService.getDocumentosRecepcion();
    this.dataSource = new MatTableDataSource<DocumentReception>(this.datos);
    this.dataSource.paginator = this.paginator;
    
    this.datosVCB = DocumentVcbService.getDocumentosVCB();
    this.dataSourceVCB = new MatTableDataSource<DocumentVCB>(this.datosVCB);
    this.dataSourceVCB.paginator = this.paginatorVCB;
  }

  
  // Tabla Recepción de Documentos
  columnas: string[] = ['codigo', 'descripcion', 'fecha', 'funcionario'];
  datos: DocumentReception[] = [];
  dataSource: any;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  
  // Tabla Documentos VCB°
  columnasVCB: string[] = ['trd', 'asunto', 'fecha', 'funcionario']
  dataSourceVCB: any;
  datosVCB: DocumentVCB[] = [];

  @ViewChild('paginatorVCB', { static: true }) paginatorVCB!: MatPaginator;

  // Modal Recepción Variables

  asunto: string = '';
  // remitente: string = '';
  // emisor: string = '';
  fecha_recepcion: string = '';
  fecha_actividad_oficio: string = '';
  observaciónes_recepcion: string = '';
  archivo_recepcion: string = '';
  tipo_recepcion: string = '';
  ventanilla_unica: string = '';

  mControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined
  emisorControl: FormControl = new FormControl();
  emisorEnabled: boolean = false;
  fechaAsuntoEnabled: boolean = false;

  buscarRemitente = 'name';
  remitente = [
    {
      id: 1,
      name: 'Deibar René Hurtado Herrera - Rector'
    },
    {
      id: 2,
      name: 'Laura Ismenia Castellanos - Secretaria General'
    },
    {
      id: 3,
      name: 'Edgar Camacho Godoy - Decano FCPS'
    },
    {
      id: 3,
      name: 'Francisco Javier Valencia - Jefe Gestión de la Cultura'
    }
  ];


  buscarResponsableAvance = 'name';
  responsableAvance = [
    {
      id: 1,
      name: 'Cesar Alfaro Mosquera Dorado - Vicerrector'
    },
    {
      id: 2,
      name: 'Juan Coronado - Docente'
    },
    {
      id: 3,
      name: 'Edgar Camacho Godoy - Decano FCPS'
    },
    {
      id: 3,
      name: 'Francisco Javier Valencia - Jefe Gestión de la Cultura'
    }
  ];


  buscarEmisor = 'name';
  emisor = [
    {
      id: 1,
      name: 'Carolina Duarte Olmedo - Estudiante Enfermería'
    },
    {
      id: 2,
      name: 'Esteban David Chávez Restrepo - Estudiante Diseño Gráfico'
    },
    {
      id: 3,
      name: 'Edgar Camacho Godoy - Decano FCSP '
    },
    {
      id: 3,
      name: 'Francisco Javier Valencia - Jefe Gestión de la Cultura'
    }
  ];

  newReceptionOK(content: any, modo: string) {

    // this.modalService.close(content);
    this.modalRef.close();
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  cleanSearchVCB() {
    this.terminoBusquedaVCB = '';
    this.dataSourceVCB.filter = this.terminoBusquedaVCB.trim();
  }

  applyFilterVCB(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVCB.filter = filterValue.trim().toLowerCase();
  }

  control = new FormControl();




  terminoBusquedaControl = new FormControl();
  resultadosBusquedaTRD: string[] = [];
  totalDocs = 271;
  generatedDocs = 29;
  pendingDocs = 6;
  availableDocs = 4;


  dataRemitente: any[] = ['Rector', 'Secretaría General', 'Rectoría'];


  // ];
  resultadosBusqueda: any[] = [];
  terminoBusqueda: string = '';



  formNewDocumentReception = new FormGroup({
    asunto: new FormControl(''),
    remitente: new FormControl(''),
    emisor: new FormControl(''),
    fecha_actividad: new FormControl(''),
    archivo: new FormControl(new File([''], 'archivo.pdf', { type: 'application/pdf' })),
    observacion: new FormControl(''),

  });

  addNewDocumentReception() {
    console.log(this.formNewDocumentReception.value)
  }



  resultadosBusquedaVCB: any[] = [];
  terminoBusquedaVCB: string = '';
  titleNewDocument = 'Nueva Solicitud de Avance';


  buscarCategoriaTRD = 'name';

  categorias = [
    { id: 1, name: 'Citaciones' },
    { id: 2, name: 'Citación Comité Bienestar Universitario' },
    { id: 3, name: 'Citación de Consejo de Cultura y Bienestar' },
    { id: 4, name: 'Citación a Reunión como Oficio del Vicerrector' },
    { id: 5, name: 'Citación a Reunión Temas Generales' },
    { id: 6, name: 'Actas' },
    { id: 7, name: 'Citación Comité Bienestar Universitario' },
    { id: 8, name: 'Acta de Comité Bienestar Universitario' },
    { id: 9, name: 'Acta de Consejo de Cultura y Bienestar' },
    { id: 10, name: 'Citación de Consejo de Cultura y Bienestar' },
    { id: 11, name: 'Acta de Eliminación Documentos de Archivo' },
    { id: 12, name: 'Acta de Reunión' },
    { id: 13, name: 'Circulares' },
    { id: 14, name: 'Circular Informativa' },
    { id: 15, name: 'Circular Normativa' },
    { id: 16, name: 'Certificados' },
    { id: 17, name: 'Certificados de Supervisoría' },
    { id: 18, name: 'Certificados de Monitoría' },
    { id: 19, name: 'Certificados de Eventos' },
    { id: 20, name: 'Certificados Realización Taller' },
    { id: 21, name: 'Certificados de un Profesrional, Tallerista, o semejante' },
    { id: 22, name: 'Convocatoria' },
    { id: 23, name: 'Convocatorias Grupos y Proyectos Sistema de Cultura y Bienestar' },
    { id: 24, name: 'Informes' },
    { id: 25, name: 'Informe Administrativo' },
    { id: 26, name: 'Informe de Eventos' },
    { id: 27, name: 'Informes de Gestión' },
    { id: 28, name: 'Informe Técnico' },
    { id: 29, name: 'Informe Sistema Integrado de Gestión de Calidad' },
    { id: 30, name: 'Instrumentos de Control' },
    { id: 31, name: 'Registro Diario de Correspondencia' },
    { id: 32, name: 'Formato Único de Inventario Documental' },
    { id: 33, name: 'Programas' },
    { id: 34, name: 'Voluntariado' },
    { id: 35, name: 'Resoluciones' },
    { id: 36, name: 'Resoluciones Vicerrectoría de Cultura y Bienestar' },
    { id: 37, name: 'Solicitudes' },
    { id: 38, name: 'Solicitud de Avances' },
    { id: 30, name: 'Solicitud de Avances o Viáticos' },
    { id: 40, name: 'Solicitud de Viáticos' },
    { id: 41, name: 'Solicitud de Servicio Específico de la Universidad del Cauca' },
    { id: 42, name: 'Solicitud de Elementos de Consumo' },
    { id: 43, name: 'Solicitud de Elementos Devolutivos' },
    { id: 44, name: 'Solicitud Mantenimiento de Equipos' },
    { id: 45, name: 'Solicitud de Permisos y Compensatorios' },
    { id: 46, name: 'Solicitud de Transporte' }
  ];





  categoriasFiltradas: any[] = [];


  formulario(name: string) {
    console.log(name)
  }

  formularioCategoria(content: any, modo: any) {

    if (modo.subcategorias == "Solicitud de Avances") {
      console.log('AAAA')
    }

    if (modo.subcategorias == "Informe Administrativo") {
      this.modalService.open(content, { size: 'lg' });
      this.titleNewDocument = 'Nuevo Informe Administrativo'
    }
  }

  documento: any = {
    asunto: '',
    remitente: '',
    emisor: '',
    fecha: ''
  };

  aceptForm(content: any, modo: string) {
    this.modalService.open(content);
  }


  documentoVCB: any = {
    asunto: '',
    remitente: '',
    fecha: '',
    answer: '',
    dirigido: ''
  };


  fechaHora: string = '';


  actualizarFechaHora() {
    const now = new Date();
    this.fechaHora = now.toLocaleString();
  }
  valor1!: string;
  valor2!: string;
  resultado!: string;

  operaciones = [
    { valor: 'suma', muestraValor: 'Sumar' },
    { valor: 'resta', muestraValor: 'Restar' },
    { valor: 'multiplicacion', muestraValor: 'Multiplicar' },
    { valor: 'division', muestraValor: 'Dividir' }
  ];

  seleccionada: string = this.operaciones[0].valor;

  optiones = [
    {
      id: 1,
      name: 'Georgia'
    },
    {
      id: 2,
      name: 'Usa'
    },
    {
      id: 3,
      name: 'England'
    }
  ];

  datar = [
    {
      id: 1,
      name: 'Georgia'
    },
    {
      id: 2,
      name: 'Usa'
    },
    {
      id: 3,
      name: 'England'
    }
  ];


  selectEvent(item: any) {
    // do something with selected item
  }
  value: string = ''

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

  recepcionFisica = false;
  recepcionVirtual = false;

  onClear() {

  }
  selectEventResponsableAvance(item: any) {
    console.log(item.name)
    if (item.name == 'Cesar Alfaro Mosquera Dorado - Vicerrector') {

      this.identificacionResponsableAvance = '16.735.145'
      this.expedicionResponsableAvance = 'Palmira'
      this.correoResponsableAvance= 'alfaromosquera@unicauca.edu.co'
      this.celularResponsableAvance= '3012356468'
    }
  }
  identificacionResponsableAvance = '';
  expedicionResponsableAvance = '';
  correoResponsableAvance='';
  celularResponsableAvance='';
  conceptoAvance= '';
  funcionamientoAvance= false;
  inversionAvance= false;
  trd = false;
  selectEventC(item: any) {

    this.trd = true;// do something with selected item
  }

  onChangeSearchC(val: string) {
    if (val === '') {
      this.trd = false;
    }
  }

  onFocusedC(e: any) {
    // do something when input is focused
  }



  onClearC() {

  }


openModal(){
  const dialogRef = this.dialog.open(DocumentoRecepcionComponent, {
    disableClose: true,
    width: '550px',
    height: '500px'
    // data: 'CONTENIDO'
  });
  dialogRef.afterClosed().subscribe(res => {
    console.log(res)
  })
}

  modalRef: any;
  open(content: any, modo: string) {

    if (modo === 'new-reception') {
      this.onClear();
      this.modalRef = this.modalService.open(content, { size: 'lg', scrollable: true });


    }
    if (modo === 'new-document') {
      console.log('New Document VCB')
      this.modalRef = this.modalService.open(content, { size: 'lg', scrollable: true });
    }

    if (modo === 'new-trd') {
      console.log('New Document VCB')
      this.modalService.open(content);
    }


  }


}
