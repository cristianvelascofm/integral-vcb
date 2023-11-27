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
  constructor(public dialogRef: MatDialogRef<MainDocumentosVcbComponent>, @Inject(MAT_DIALOG_DATA) public msg: string,) {

  }
  onClickNO(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close();
  }
}
