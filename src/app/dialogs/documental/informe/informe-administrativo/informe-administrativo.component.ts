import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-informe-administrativo',
  templateUrl: './informe-administrativo.component.html',
  styleUrls: ['./informe-administrativo.component.scss']
})
export class InformeAdministrativoComponent {
  color = '';
  constructor(public dialogRef: MatDialogRef<InformeAdministrativoComponent>, @Inject(MAT_DIALOG_DATA) public msg: string,) {
    this.filteredOptionsDestinatarioU = this.myControlDestinatarioU.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestinatarioU(value || '')),
    );
    this.filteredOptionsDestinatarioM = this.myControlDestinatarioM.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestinatarioU(value || '')),
    );
    this.filteredOptionsCopiaUnica = this.myControlCopiaUnica.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestinatarioU(value || '')),
    );
    this.filteredOptionsCopiaMultiple = this.myControlCopiaMultiple.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestinatarioU(value || '')),
    );
  }
  tituloDialog = 'Informe Administrativo';
  destinatarioUnico = true;
  destinatarioMultiple = false;
  copiaUnica= false;
  copiaMultiple = false;
  observaciones = '';
  destinatarios = '';
  asunto = '';
  fechaActual = new Date();
  myControlDestinatarioU = new FormControl('');
  myControlDestinatarioM = new FormControl('');
  myControlCopiaUnica = new FormControl('');
  myControlCopiaMultiple = new FormControl('');
  filteredOptionsDestinatarioU: Observable<string[]>;
  filteredOptionsDestinatarioM: Observable<string[]>;
  filteredOptionsCopiaUnica: Observable<string[]>;
  filteredOptionsCopiaMultiple: Observable<string[]>;
  destinatario: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];

  //ARREGLO STRING CON NOMBRES DE PERSONA - CARGO
  arrayPersonaCargo: string[] = [
    "Juan Perez - Estudiante",
    "Maria Rodriguez - Profesor",
    "Luis Garcia - Secretario",
    "Sandra Martinez - Coordinador",
    "Carlos Diaz - Director"
  ];

  dataSource: any;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  columnas: string[] = ['nombre', 'identificacion', 'cargo'];
  datos: [] = [];

  dataSourceCopia: any;
  @ViewChild('paginatorCopia', { static: true }) paginatorCopia!: MatPaginator;
  columnasCopia: string[] = ['nombre', 'identificacion', 'cargo'];
  datosCopia: [] = [];
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
    if (opcion === 'copia-multiple') {
      this.copiaUnica = false;
      this.copiaMultiple = true;
    }
    if (opcion === 'copia-unica') {
      this.copiaUnica = true;
      this.copiaMultiple = false;
    }
  }

  nuevoInforme(): void { }
}
