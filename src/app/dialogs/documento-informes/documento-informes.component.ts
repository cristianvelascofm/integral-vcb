import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documento-informes',
  templateUrl: './documento-informes.component.html',
  styleUrls: ['./documento-informes.component.scss']
})
export class DocumentoInformesComponent {

  constructor(public dialogRef: MatDialogRef<DocumentoInformesComponent>,@Inject(MAT_DIALOG_DATA) public msg: string,){

  }
  onClickNO(): void {
    this.dialogRef.close();
  }

  crear():void{
    this.dialogRef.close();
  }
}
