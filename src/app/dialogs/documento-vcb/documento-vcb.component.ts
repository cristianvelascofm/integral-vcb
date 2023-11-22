import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { DocumentoInformesComponent } from '../documento-informes/documento-informes.component';
@Component({
  selector: 'app-documento-vcb',
  templateUrl: './documento-vcb.component.html',
  styleUrls: ['./documento-vcb.component.css']
})
export class DocumentoVcbComponent {
  constructor(public dialogRef: MatDialogRef<DocumentoVcbComponent>, @Inject(MAT_DIALOG_DATA) public msg: string, public dialog: MatDialog) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmisor(value || '')),
    );
    this.filteredOptionsOficio = this.myControlOficios.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOficios(value || '')),
    );
  }
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  private _filterEmisor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categorias.filter(categorias => categorias.toLowerCase().includes(filterValue));
  }

  myControlOficios = new FormControl('');
  filteredOptionsOficio: Observable<string[]>;
  private _filterOficios(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.oficios.filter(oficios => oficios.toLowerCase().includes(filterValue));
  }

  //arreglo de string de ejemplos de asuntos de solicitudes
  oficios: string[] = [
    'Solicitud de Prestamo',
    'Solicitud de Pago',
    'Solicitud de Reintegro',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud dePago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas',
    'Solicitud de Pago de Cuotas'
  ];


  contestarDocumento = false;
  nuevoDocumento = false;
  fisico = false;
  virtual = false;
  categorias: string[] = [
    'Citaciones',
    'Citación Comité Bienestar Universitario',
    'Citación de Consejo de Cultura y Bienestar',
    'Citación a Reunión como Oficio del Vicerrector',
    'Citación a Reunión Temas Generales',
    'Actas',
    'Acta de Comité Bienestar Universitario',
    'Acta de Consejo de Cultura y Bienestar',
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

  crear() {
    const dialogRef = this.dialog.open(DocumentoInformesComponent, {
      disableClose: true,
      width: '700px',
      // height: '700px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
