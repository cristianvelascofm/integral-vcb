import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

interface Vinculacion {
  nombre: string;
}
@Component({
  selector: 'app-solicitud-tiquetes',
  templateUrl: './solicitud-tiquetes.component.html',
  styleUrls: ['./solicitud-tiquetes.component.scss']
})
export class SolicitudTiquetesComponent {
  constructor() {
    this.filteredOptionsViajero = this.myControlViajero.valueChanges.pipe(
      startWith(''),
      map(value => this._filterViajero(value || '')),
    );
  }


  dirigido = 'Jorge Enrique Barrera Moreno - Vicerrector Administrativo';
  asunto = 'Solicitud de Tiquetes';
  fechaActual = new Date();
  myControlViajero = new FormControl('');
  filteredOptionsViajero: Observable<string[]>;
  viajero: string[] = ['Rector - Deibar René Hurtado Herrera', 'Vicerrector de Cultura y Bienestar - Cesar Alfaro Mosquera Dorado', 'Secretaria General - Laura Ismenia Castellanos Vivas'];
  vinculacionControl = new FormControl<Vinculacion[]>([], [Validators.required]);
  vinculacion: Vinculacion[] = [
    { nombre: 'Estudiante Pregrado' },
    { nombre: 'Estudiante Posgrado' },
    { nombre: 'Docente de Planta' },
    { nombre: 'Docenta Ocasional' },
    { nombre: 'Docenta Cátedra' },
    { nombre: 'Administrativo' },
    { nombre: 'Contratista' },
    { nombre: 'Visitante' },
    
  ]
  nuevoTiquete() { };


  private _filterViajero(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.viajero.filter(viajero => viajero.toLowerCase().includes(filterValue));
  }

}
