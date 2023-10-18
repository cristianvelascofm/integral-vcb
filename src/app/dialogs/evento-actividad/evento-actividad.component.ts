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
  selectedTime: string = "08:00";

  onTimeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedTime = inputElement.value;
    console.log('Nueva hora seleccionada:', this.selectedTime);
  }

  actividad={
    nombre: '',
    lugar: '',
    categoria: 'conversatorio',
    responsable:'',
    fechaInicio: '',
    fechaFin: '',
    hora: this.selectedTime


  }

  onClickNO():void{
    this.dialogRef.close();
  }
  agregarActividad(){}
}
