import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import axios from 'axios';
import { Observable, map, startWith } from 'rxjs';
import { Persona } from 'src/app/model/Persona';
import { DocumentoRecepcion } from 'src/app/services/documento.service';


interface oficioRecepcion {
  tipo: string;
}

interface Tramite {
  nombre: string;
}
interface espacios {
  nombre: string;
}
interface Viaje {
  viajero?: Persona;
  fechaSalida: string;
  horaSalida: string;
  ciudadDestino: string;
  fechaRegreso?: string;
  horaRegreso?: string;
  ciudadRegreso?: string
}

@Component({
  selector: 'app-documento-recepcion',
  templateUrl: './documento-recepcion.component.html',
  styleUrls: ['./documento-recepcion.component.scss']
})
export class DocumentoRecepcionComponent {
  constructor(public dialogRef: MatDialogRef<DocumentoRecepcionComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptionsEmisor = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmisor(value || '')),
    );

    this.filteredOptionsFuncionarioVCB = this.myControlFuncionarioVCB.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFuncionarioVCB(value || '')),
    );
    this.filteredOptionsOficioVCB = this.myControlOficioVCB.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOficioVCB(value || '')),
    );
  }
  archivar = false;
  disabledCeder = false;
  disabledArchivar = false
  fileName = '';
  fechaDocumento = '';
  fechaRealizacion = '';
  labelPosition: 'before' | 'after' = 'after';
  // VARIABLES CONTROL FILTRO REMITENTE
  myControl = new FormControl('');
  myControlOficioVCB = new FormControl('');
  myControlFuncionarioVCB = new FormControl({ value: '', disabled: this.disabledCeder });
  remitente: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];
  filteredOptions: Observable<string[]>;
  filteredOptionsFuncionarioVCB: Observable<string[]>;
  filteredOptionsOficioVCB: Observable<string[]>;
  oficioVCB: string[]=[
    '7.1-92.8/226 - Solicitud CDP Andrés Peréz',
    '7.1-93.4/225 - Solicitud CDP Carlos Sánchez',
    '7.1-93.4/227 - Solicitud CDP Carlos Sánchez',
  ]
  funcionarioVCB: string[] = ['Cesar Alfaro Mosquera Dorado', 'María del Socorro Fajardo', 'Isabel Cristina Chamorro López', 'Deicy Coral']
  // VARIABLES CONTROL FILTRO EMISOR
  myControl2 = new FormControl('');
  emisor: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];
  filteredOptionsEmisor: Observable<string[]>;


  docentesSelected: boolean = false;
  estudiantesSelected: boolean = false;
  administrativosSelected: boolean = false;
  contratistasSelected: boolean = false;
  visitantesSelected: boolean = false;

  numeroDocentes: number = 0;
  numeroEstudiantes: number = 0;
  numeroAdministrativos: number = 0;
  numeroContratistas: number = 0;
  numeroVisitantes: number = 0;
  totalViajerosTerrestres: number = 0;

  recepcion: DocumentoRecepcion = {
    trd: '',
    fechaDocumento: '',
    fisico: false,
    virtual: false,
    remitente: '',
    destinatario: '',
    asunto: '',
    archivo: new File([], ''),
    ubicacion: '',
    estado: '',
    fechaRecepcion: '',
    fechaRealizacion: '',
    tipoRemitente: '',
    ventanillaUnica: '',
    usuario: '',
  }
  viajero: string = ''
  viaje: Viaje = {
    fechaSalida: '',
    horaSalida: '',
    ciudadDestino: '',
  }

  oficioRecepcionControl = new FormControl<oficioRecepcion[]>([], [Validators.required]);
  previousSelectedOficios: oficioRecepcion[] = [];
  oficios: oficioRecepcion[] = [
    { tipo: 'Apoyo Económico' },
    { tipo: 'Sonido' },
    { tipo: 'Transporte Aéreo - Tiquetes' },
    { tipo: 'Transporte Terrestre' },
    { tipo: 'Refrigerios' },
    { tipo: 'Souvenirs' },
    { tipo: 'Espacios Físicos' },
    { tipo: 'Invitación' },
    { tipo: 'Informativa' },
    { tipo: 'Trámite Interno' }
  ];

  oficioEspaciosControl = new FormControl<oficioRecepcion[]>([], [Validators.required]);
  oficioTramiteControl = new FormControl<String[]>([], [Validators.required]);
  previousSelectedEspacios: oficioRecepcion[] = [];
  espacios: espacios[] = [
    { nombre: 'Patio Principal - Casa Museo Mosquera' },
    { nombre: 'Patio Secundario - Casa Museo Mosquera' },
    { nombre: 'Auditorio - Casa Museo Mosquera' },
    { nombre: 'Paraninfo Francisco José de Caldas' },
  ];

  mostrarObservaciones = false;
  mostrarCeder = false;
  mostrarCompletarTramite = false;
  mostrarCheckArchivar = false;
  tramites = [
    'Observaciones',
    'Completar Trámite',
    'Archivar Trámite'
  ]
  tramiteInterno = '';

  selectedTime: string = "12:00";
  selectedTimeRegreso: string = "12:00";
  fechaSalidaTerrestre = '';
  fechaRegresoTerrestre = '';
  selectedTimeSalidaTerrestre = '';
  selectedTimeLlegadaTerrestre = '';

  onTimeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedTime = inputElement.value;
  }
  // SELECT HORA PARA VIAJE TERRESTRE
  onTimeChangeSalidaTerrestre(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedTimeSalidaTerrestre = inputElement.value;
  }
  onTimeChangeRegresoTerrestre(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedTimeRegreso = inputElement.value;
  }

  // Variables booleanas para activar/desactivar propiedades en el template
  mostrarApoyoEconomico = false;
  mostrarSonido = false;
  mostrarTransporteAereo = false;
  mostrarTransporteTerrestre = false;
  mostrarRefrigerios = false;
  mostrarSouvenirs = false;
  mostrarEspaciosFisicos = false;
  mostrarInvitacion = false;
  mostrarInformativa = false;
  mostrarTramiteInterno = false;
mostrarOficioTramite = false;

  cambioCheckArchivar() {
    if (this.archivar === true) {
      this.myControlFuncionarioVCB.disable();
      this.myControlFuncionarioVCB.setValue('');
    } else {
      this.myControlFuncionarioVCB.enable()
    }
  }


  lugarInvitacion = '';
  numeroEntrada: string = '';
  destinoApoyo: string = '';
  detallesSonido: string = '';
  detallesRefrigerio: string = '';
  detallesSoivenir: string = '';
  ciudadOrigen: string = '';
  ciudadDestino: string = '';
  ciudadOrigenVehiculo: string = '';
  ciudadDestinoVehiculo: string = '';
  responsableViaje: string = '';
  lugarRecogidaIda: string = ''
  dependenciaSolicitante: string = '';
  terminoBusquedaViajero: string = '';
  columnas: string[] = ['solicitante', 'fechaSalida', 'horaSalida', 'ciudadDestino', 'fechaRegreso', 'horaRegreso', 'ciudadRegreso'];
  datos: [] = [];

  dataSource: any;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  onSelectionChange() {
    const selectedOficios = this.oficioRecepcionControl.value;

    if (selectedOficios) {
      const addedOficios = selectedOficios.filter(oficio => !this.previousSelectedOficios.includes(oficio));
      const removedOficios = this.previousSelectedOficios.filter(oficio => !selectedOficios.includes(oficio));

      if (addedOficios.length > 0) {
        addedOficios.forEach(oficio => this.activarPropiedad(oficio.tipo));
        // ... otras operaciones que desees realizar al agregar opciones
      }

      if (removedOficios.length > 0) {
        removedOficios.forEach(oficio => this.desactivarPropiedad(oficio.tipo));
        // ... otras operaciones que desees realizar al quitar opciones
      }

      // Actualiza el valor previo con la selección actual
      this.previousSelectedOficios = selectedOficios;
    } else {
      // Manejar el caso cuando selectedOficios es nulo (puede ser un escenario raro)
      console.error('selectedOficios es nulo');
    }
  }

  // Funciones para activar/desactivar propiedades en función de la opción seleccionada
  private activarPropiedad(tipo: string): void {
    switch (tipo) {
      case 'Apoyo Económico':
        this.mostrarApoyoEconomico = true;
        break;
      case 'Sonido':
        this.mostrarSonido = true;
        break;
      case 'Transporte Aéreo - Tiquetes':
        this.mostrarTransporteAereo = true;
        break;
      case 'Transporte Terrestre':
        this.mostrarTransporteTerrestre = true;
        break;
      case 'Refrigerios':
        this.mostrarRefrigerios = true;
        break;
      case 'Souvenirs':
        this.mostrarSouvenirs = true;
        break;
      case 'Espacios Físicos':
        this.mostrarEspaciosFisicos = true;
        break;
      case 'Invitación':
        this.mostrarInvitacion = true;
        break;
      case 'Informativa':
        this.mostrarInformativa = true;
        break;
      case 'Trámite Interno':
        this.mostrarTramiteInterno = true
        break;
      // Agregar casos para las opciones restantes
    }
  }

  private desactivarPropiedad(tipo: string): void {
    switch (tipo) {
      case 'Apoyo Económico':
        this.mostrarApoyoEconomico = false;
        break;
      case 'Sonido':
        this.mostrarSonido = false;
        break;
      case 'Transporte Aéreo - Tiquetes':
        this.mostrarTransporteAereo = false;
        break;
      case 'Transporte Terrestre':
        this.mostrarTransporteTerrestre = false;
        break;
      case 'Refrigerios':
        this.mostrarRefrigerios = false;
        break;
      case 'Souvenirs':
        this.mostrarSouvenirs = false;
        break;
      case 'Espacios Físicos':
        this.mostrarEspaciosFisicos = false;
        break;
      case 'Invitación':
        this.mostrarInvitacion = false;
        break;
      case 'Informativa':
        this.mostrarInformativa = false;
        break;
      case 'Trámite Interno':
        this.mostrarTramiteInterno = false;
        break;
      // Agregar casos para las opciones restantes
    }
  }

  
  onSelectionChangeTramite(event: MatSelectChange) {
    const valorSeleccionado = event.value;
    this.activarTramite(valorSeleccionado);
  }

  activarTramite(nombre: string) {
    switch (nombre) {
      case 'Observaciones':
        this.mostrarCeder = true;
        this.mostrarCheckArchivar = false;
        this.mostrarOficioTramite = true;
        break;
      case 'Completar Trámite':
        this.mostrarCeder = true;
        this.mostrarCheckArchivar = false;
        this.mostrarOficioTramite = true;
        break
      case 'Archivar Trámite':
        this.mostrarCheckArchivar = true;
        this.archivar = true;
        this.disabledArchivar= true;
        this.mostrarCeder = false;
        this.mostrarOficioTramite = false;
        break;
    }


  }

  // filtor de busqueda para el viajero aéreo
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != '') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  }

  cleanSearchTiqutes() {
    this.terminoBusquedaViajero = '';
    this.dataSource.filter = this.terminoBusquedaViajero.trim();
  }

  openModalViajero() {

  }


  // FORMATEADOR VALOR SOLICITUD


  formatearNumero() {


    if (this.numeroEntrada && this.numeroEntrada != '') {
      const numero = parseFloat(this.numeroEntrada.replace(/,/g, '')); // Elimina comas existentes
      this.numeroEntrada = this.formatearConSeparadores(numero);
    } else {
      this.numeroEntrada = '';
    }



  }

  private formatearConSeparadores(numero: number): string {
    return numero.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onClickNO(): void {
    this.dialogRef.close();
  }
  nuevaRecepcion(): void {

  }

  registrarDocumentoRecepcion(): void {

  }

  // FILTRO PARA REMITENTE
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.remitente.filter(remitente => remitente.toLowerCase().includes(filterValue));
  }

  private _filterEmisor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.emisor.filter(emisor => emisor.toLowerCase().includes(filterValue));
  }

  private _filterFuncionarioVCB(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.funcionarioVCB.filter(funcionario => funcionario.toLowerCase().includes(filterValue));
  }

  private _filterOficioVCB(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.oficioVCB.filter(oficioVCB => oficioVCB.toLowerCase().includes(filterValue));
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      alert('Por favor, selecciona un archivo PDF.');
    }
  }
  async enviarDocumento() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('archivo', this.selectedFile);
      formData.append('accion', 'upload')
      try {
        await axios.post('http://192.168.130.79:5050', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'archivo': 'true',

          }
        });

        // La solicitud se completó con éxito
        console.log('Documento enviado correctamente.');
      } catch (error) {
        // Handle error
        console.error('Error al enviar el documento:', error);
      }
    }
  }

  sumaViajerosTerrestres() {
    this.totalViajerosTerrestres = this.numeroAdministrativos + this.numeroContratistas + this.numeroDocentes + this.numeroEstudiantes + this.numeroVisitantes;
  }
  resetNumeroViajerosTerrestres() {
    if (!this.administrativosSelected) {
      this.numeroAdministrativos = 0;
    }
    if (!this.docentesSelected) {
      this.numeroDocentes = 0;
    }
    if (!this.estudiantesSelected) {
      this.numeroEstudiantes = 0;
    }
    if (!this.visitantesSelected) {
      this.numeroVisitantes = 0;
    }
    if (!this.contratistasSelected) {
      this.numeroContratistas = 0;
    }
    this.sumaViajerosTerrestres();
  }
}
