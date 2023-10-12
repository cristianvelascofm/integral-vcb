import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';;

@Component({
  selector: 'app-evento-actividad',
  templateUrl: './evento-actividad.component.html',
  styleUrls: ['./evento-actividad.component.css']
})

export class EventoActividadComponent {

  constructor(public dialogRef: MatDialogRef<EventoActividadComponent>,@Inject(MAT_DIALOG_DATA) public msg: string){

  }

  ngOnInit(){
    
  }

  onClickNO():void{
    this.dialogRef.close();
  }

}
