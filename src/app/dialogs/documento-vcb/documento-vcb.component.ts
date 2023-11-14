import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-documento-vcb',
  templateUrl: './documento-vcb.component.html',
  styleUrls: ['./documento-vcb.component.css']
})
export class DocumentoVcbComponent {
  constructor(public dialogRef: MatDialogRef<DocumentoVcbComponent>, @Inject(MAT_DIALOG_DATA) public msg: string) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmisor(value || '')),
    );
  }
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  private _filterEmisor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categorias.filter(categorias => categorias.toLowerCase().includes(filterValue));
  }

  categorias: string[] = [
    'Citaciones',
    'Citación Comité Bienestar Universitario',
    'Citación de Consejo de Cultura y Bienestar',
    'Citación a Reunión como Oficio del Vicerrector',
    'Citación a Reunión Temas Generales',
    'Actas',
    'Citación Comité Bienestar Universitario',
    'Acta de Comité Bienestar Universitario',
    'Acta de Consejo de Cultura y Bienestar',
    'Citación de Consejo de Cultura y Bienestar',
    'Acta de Eliminación Documentos de Archivo',
    'Acta de Reunión',
    'Circulares',
    'Circular Informativa',
    'Circular Normativa',
    'Certificados',
    'Certificados de Supervisoría',
    'Certificados de Monitoría',
    'Certificados de Eventos',
    'Certificados Realización Taller',
    'Certificados de un Profesrional, Tallerista, o semejante',
    'Convocatoria',
    'Convocatorias Grupos y Proyectos Sistema de Cultura y Bienestar',
    'Informes',
    'Informe Administrativo',
    'Informe de Eventos',
    'Informes de Gestión',
    'Informe Técnico',
    'Informe Sistema Integrado de Gestión de Calidad',
    'Instrumentos de Control',
    'Registro Diario de Correspondencia',
    'Formato Único de Inventario Documental',
    'Programas',
    'Voluntariado',
    'Resoluciones',
    'Resoluciones Vicerrectoría de Cultura y Bienestar',
    'Solicitudes',
    'Solicitud de Avances',
    'Solicitud de Avances o Viáticos',
    'Solicitud de Viáticos',
    'Solicitud de Servicio Específico de la Universidad del Cauca',
    'Solicitud de Elementos de Consumo',
    'Solicitud de Elementos Devolutivos',
    'Solicitud Mantenimiento de Equipos',
    'Solicitud de Permisos y Compensatorios',
    'Solicitud de Transporte'
  ];

  onClickNO(): void {
    this.dialogRef.close();
  }

  crear(): void {

  }
}
