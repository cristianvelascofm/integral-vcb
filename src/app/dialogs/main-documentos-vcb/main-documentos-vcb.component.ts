import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-main-documentos-vcb',
  templateUrl: './main-documentos-vcb.component.html',
  styleUrls: ['./main-documentos-vcb.component.scss']
})
export class MainDocumentosVcbComponent {
  color = '';
  constructor(public dialogRef: MatDialogRef<MainDocumentosVcbComponent>, @Inject(MAT_DIALOG_DATA) public msg: string,) {
    this.filteredOptionsDestinatarioU = this.myControlDestinatarioU.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestinatarioU(value || '')),
    );
  }
  tituloDialog = '';
  destinatarioUnico = true;
  destinatarioMultiple = false;
  observaciones = '';
  destinatarios = '';
  asunto = '';
  fechaActual = new Date();
  myControlDestinatarioU = new FormControl('');
  filteredOptionsDestinatarioU: Observable<string[]>;
  destinatario: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];

  //ARREGLO STRING CON NOMBRES DE PERSONA - CARGO
  arrayPersonaCargo: string[] = [
    "Juan Perez - Estudiante",
    "Maria Rodriguez - Profesor",
    "Luis Garcia - Secretario",
    "Sandra Martinez - Coordinador",
    "Carlos Diaz - Director"
  ];
  onClickNO(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close();
  }

  private _filterDestinatarioU(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinatario.filter(destinatario => destinatario.toLowerCase().includes(filterValue));
  }

  onRadioChange(opcion: string) {
    if (opcion === 'unico') {
      this.destinatarioMultiple = false;
      this.destinatarioUnico = true;
    }
    if (opcion === 'multiple') {
      this.destinatarioUnico = false;
      this.destinatarioMultiple = true;
    }
  }
}
