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

  oficios: oficioRecepcion[] = [
    { tipo: 'Apoyo Económico' },
    { tipo: 'Sonido' },
    { tipo: 'Transporte Aéreo - Tiquetes' },
    { tipo: 'Transporte Terrestre' },
    { tipo: 'Refrigerios' },
    { tipo: 'Souvenirs' },
    { tipo: 'Espacios Físicos' },
  ];
  onAnimalSelectionChange() {
    const selectedOficios = this.oficioRecepcionControl.value;

    if (selectedOficios && selectedOficios.length > 0) {
      // Muestra una alerta con los tipos de solicitud seleccionados
      const selectedTipos = selectedOficios.map(oficio => oficio.tipo);
      alert(`Has seleccionado los siguientes tipos de solicitud: ${selectedTipos.join(', ')}`);
    }
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
