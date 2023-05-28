import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject, of } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentReception, DocumentReceptionService } from '../services/document-reception.service';
import { DocumentVCB, DocumentVcbService } from '../services/document-vcb.service';


@Component({
  selector: 'app-document-module',
  templateUrl: './document-module.component.html',
  styleUrls: ['./document-module.component.scss']
})
export class DocumentModuleComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.actualizarFechaHora();
    setInterval(() => {
      this.actualizarFechaHora();
    }, 1000);

// Carga inicial de Datos de las Tablas de Recepción y Documentos VCB
    this.datos = DocumentReceptionService.getDocumentosRecepcion();
    this.dataSource = new MatTableDataSource<DocumentReception>(this.datos);
    this.dataSource.paginator = this.paginator;
    this.datosVCB = DocumentVcbService.getDocumentosVCB();
    this.dataSourceVCB = new MatTableDataSource<DocumentVCB>(this.datosVCB);
    this.dataSourceVCB.paginator= this.paginatorVCB;
  }

// Tabla Recepción de Documentos
  columnas: string[] = ['codigo', 'descripcion', 'fecha', 'funcionario'];
  datos: DocumentReception[] = [];
  dataSource: any;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  // Tabla Documentos VCB
  columnasVCB: string[] = ['trd','asunto','fecha','funcionario']
  dataSourceVCB: any;
  datosVCB: DocumentVCB[] = [];
  @ViewChild('paginatorVCB', { static: true }) paginatorVCB!: MatPaginator;


  control = new FormControl();




  terminoBusquedaControl = new FormControl();
  resultadosBusquedaTRD: string[] = [];
  totalDocs = 271;
  generatedDocs = 29;
  pendingDocs = 6;
  availableDocs = 4;
  data: any[] = [
    { serie: 'RF-8.1.5', asunto: 'Pago premios de los concursos de cuento infantil, juvenil y universitario. ', fecha: '14/04/2023', operario: 'Clara Gómez' },
    { serie: '5.1.92.25', asunto: 'Prestar servicios profesionales como Diseñador Gráfico para la producción de elementos gráficos análogos y digitales que permitan la difusión de los servicios de las divisiones y programas de la Vicerrectoría de Cultura y Bienestar, además de actividades apoyadas por la Vicerrectoría de Cultura y Bienestar. Stepania Teran', fecha: '23/03/2023', operario: 'Socorro Fajardo' },
    { serie: '2.1-92.1', asunto: 'Invitación Tercer Festival de Danza Folclorica', fecha: '08/03/2023', operario: 'Cristian Velasco' },
    // Agrega más datos según tus necesidades
  ];

  // datosVCB: any[] = [
  //   { serie: '7.1-52.5/128', asunto: 'Pago premios de los concursos de cuento infantil, juvenil y universitario. ', fecha: '14/04/2023', operario: 'Clara Gómez' },
  //   { serie: '5.1.92.25', asunto: 'Prestar servicios profesionales como Diseñador Gráfico para la producción de elementos gráficos análogos y digitales que permitan la difusión de los servicios de las divisiones y programas de la Vicerrectoría de Cultura y Bienestar, además de actividades apoyadas por la Vicerrectoría de Cultura y Bienestar. Stepania Teran', fecha: '23/03/2023', operario: 'Socorro Fajardo' },
  //   { serie: '2.1-92.1', asunto: 'Invitación Tercer Festival de Danza Folclorica', fecha: '08/03/2023', operario: 'Cristian Velasco' },
  //   // Agrega más datos según tus necesidades
  // ];
  resultadosBusqueda: any[] = [];
  terminoBusqueda: string = '';

  resultadosBusquedaVCB: any[] = [];
  terminoBusquedaVCB: string = '';
  titleNewDocument = '';
  public categorias: any[] = [

    {

      nombre: 'Citaciones',
      subcategorias: [
        'Citación Comité Bienestar Universitario',
        'Citación de Consejo de Cultura y Bienestar',
        'Citación a Reunión como Oficio del Vicerrector',
        'Citación a Reunión Temas Generales',
      ]
    },
    {

      nombre: 'Actas',
      subcategorias: [
        'Citación Comité Bienestar Universitario',
        'Acta de Comité Bienestar Universitario',
        'Acta de Consejo de Cultura y Bienestar',
        'Citación de Consejo de Cultura y Bienestar',
        'Acta de Eliminación Documentos de Archivo',
        'Acta de Reunión'
      ]
    },
    {
      nombre: 'Circulares',
      subcategorias: [
        'Circular Informativa',//por lo general las tiene más el CDU
        'Circular Normativa'
      ]
    },
    {
      nombre: 'Certificados',
      subcategorias: [
        'Certificados de Supervisoría',
        'Certificados de Monitoría',
        'Certificados de Eventos',
        'Certificados Realización Taller',
        'Certificados de un Profesrional, Tallerista, o semejante'
      ]
    },
    {
      nombre: 'Convocatoria',
      subcategorias: [
        'Convocatorias Grupos y Proyectos Sistema de Cultura y Bienestar'
      ]
    },
    {
      nombre: 'Informes',
      subcategorias: [
        'Informe Administrativo',
        'Informe de Eventos',
        'Informes de Gestión',
        'Informe Técnico',
        'Informe Sistema Integrado de Gestión de Calidad'
      ]
    },
    {
      nombre: 'Instrumentos de Control',
      subcategorias: [
        'Registro Diario de Correspondencia',
        'Formato Único de Inventario Documental'
      ]
    },
    {
      nombre: 'Programas',
      subcategorias: [
        'Voluntariado',
      ]
    },
    {
      nombre: 'Resoluciones',
      subcategorias: [
        'Resoluciones Vicerrectoría de Cultura y Bienestar'
      ]
    },
    {
      nombre: 'Solicitudes',
      subcategorias: [
        'Solicitud de Avances',
        'Solicitud de Viáticos',
        'Solicitud de Servicio Espécifico de la Universidad del Cauca',
        'Solicitud de Elementos de Consumo',
        'Solicitud de Elementos Devolutivos',
        'Solicitud Mantenimiento de Equipos',
        'Solicitud de Permisos y Compensatorios',
        'Solicitud de Transporte',

      ]
    }
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

  buscarCategorias(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.categoriasFiltradas = [];

    this.categorias.forEach(categoria => {
      const categoriaEncontrada = {
        nombre: categoria.nombre,
        subcategorias: [] as string[] // Definir el tipo de datos para subcategorias
      };

      // Filtrar por categoría
      if (categoria.nombre.toLowerCase().includes(inputValue)) {
        this.categoriasFiltradas.push(categoriaEncontrada);
      }

      // Filtrar por subcategoría
      categoria.subcategorias.forEach((subcategoria: string) => { // Definir el tipo de datos para subcategoria
        if (subcategoria.toLowerCase().includes(inputValue)) {
          categoriaEncontrada.subcategorias.push(subcategoria);
          this.categoriasFiltradas.push(categoriaEncontrada);
        }
      });
    });
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(categoria: string): string {
    return categoria ? categoria : '';
  }

  actualizarFechaHora() {
    const now = new Date();
    this.fechaHora = now.toLocaleString();
  }
  valor1!: number;
  valor2!: number;
  resultado!: number;

  operaciones = [
    { valor: 'suma', muestraValor: 'Sumar' },
    { valor: 'resta', muestraValor: 'Restar' },
    { valor: 'multiplicacion', muestraValor: 'Multiplicar' },
    { valor: 'division', muestraValor: 'Dividir' }
  ];

  seleccionada: string = this.operaciones[0].valor;

  operar() {
    switch (this.seleccionada) {
      case 'suma': this.resultado = this.valor1 + this.valor2;
        break;
      case 'resta': this.resultado = this.valor1 - this.valor2;
        break;
      case 'multiplicacion': this.resultado = this.valor1 * this.valor2;
        break;
      case 'division': this.resultado = this.valor1 / this.valor2;
        break;
    }
  }





  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyFilterVCB(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVCB.filter = filterValue.trim().toLowerCase();
  }
  buscar() {
    console.log(this.terminoBusqueda)
    const terminoBusquedaLowerCase = this.terminoBusqueda.toLowerCase();
    this.resultadosBusqueda = this.datos.filter(registro =>
      registro._id.toLowerCase().includes(terminoBusquedaLowerCase) ||
      registro.asunto.toLowerCase().includes(terminoBusquedaLowerCase) ||
      registro.fecha_recepcion.toLowerCase().includes(terminoBusquedaLowerCase) ||
      registro.funcionario_recepcion.toLowerCase().includes(terminoBusquedaLowerCase)
    );
  }

  // buscarVCB() {
  //   const terminoBusquedaLowerCase = this.terminoBusquedaVCB.toLowerCase();
  //   this.resultadosBusquedaVCB = this.datosVCB.filter(registro =>
  //     registro.serie.toLowerCase().includes(terminoBusquedaLowerCase) ||
  //     registro.asunto.toLowerCase().includes(terminoBusquedaLowerCase) ||
  //     registro.fecha.toLowerCase().includes(terminoBusquedaLowerCase) ||
  //     registro.operario.toLowerCase().includes(terminoBusquedaLowerCase)
  //   );
  // }





  keyword = 'name';
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



  onClear() {

  }
  open(content: any, modo: string) {

    if (modo === 'new-reception') {
      this.onClear();
      this.modalService.open(content);
      // this.modalService.open(content, { size: 'lg' });
    }
    if (modo === 'new-document') {
      console.log('New Document VCB')
      this.modalService.open(content);
    }

    if (modo === 'new-trd') {
      console.log('New Document VCB')
      this.modalService.open(content);
    }


  }


}
// export class Articulo {
//   constructor(public codigo: number, public descripcion: string, public precio: number, public serie: string, public asunto: string, public fecha: string, public operario: string) {


//   }
// }