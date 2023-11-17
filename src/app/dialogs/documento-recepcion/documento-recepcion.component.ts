import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { Observable, map, startWith } from 'rxjs';
import { DocumentoRecepcion } from 'src/app/services/documento.service';


interface oficioRecepcion {
  tipo: string;
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
  }

  fileName = '';
  fechaDocumento = ''
  labelPosition: 'before' | 'after' = 'after';

  // VARIABLES CONTROL FILTRO REMITENTE
  myControl = new FormControl('');
  remitente: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];
  filteredOptions: Observable<string[]>;
  // VARIABLES CONTROL FILTRO EMISOR
  myControl2 = new FormControl('');
  emisor: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];
  filteredOptionsEmisor: Observable<string[]>;

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
  ];



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
      // Agregar casos para las opciones restantes
    }
  }

  // FORMATEADOR VALOR SOLICITUD
  numeroEntrada: string = '';

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
}
