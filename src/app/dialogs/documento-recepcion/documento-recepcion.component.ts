import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documento-recepcion',
  templateUrl: './documento-recepcion.component.html',
  styleUrls: ['./documento-recepcion.component.scss']
})
export class DocumentoRecepcionComponent {
  constructor(public dialogRef: MatDialogRef<DocumentoRecepcionComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
  }

  asunto: string = '';
  nombre = '';
  buscarRemitente = 'name';
  buscarEmisor = 'name';
  emisorEnabled: boolean = false;
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

  onClickNO(): void {
    this.dialogRef.close();
  }
  nuevaRecepcion(): void {

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  selectEvent(item: any) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something when input is focused
  }

}
