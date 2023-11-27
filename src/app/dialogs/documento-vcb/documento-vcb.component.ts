import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { MainDocumentosVcbComponent } from '../main-documentos-vcb/main-documentos-vcb.component';
@Component({
  selector: 'app-documento-vcb',
  templateUrl: './documento-vcb.component.html',
  styleUrls: ['./documento-vcb.component.css']
})
export class DocumentoVcbComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DocumentoVcbComponent>, @Inject(MAT_DIALOG_DATA) public msg: string, public dialog: MatDialog) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmisor(value || '')),
    );
    this.filteredOptionsOficio = this.myControlOficios.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOficios(value || '')),
    );
    this.filteredOptionsOficioArchivo = this.myControlOficioArchivo.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOficioArchivo(value || '')),
    );

  }

  myControl = new FormControl('');
  myControlOficioArchivo = new FormControl('');
  filteredOptions: Observable<string[]>;
  filteredOptionsOficioArchivo: Observable<string[]>;
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
  private _filterOficioArchivo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.oficiosArchivo.filter(oficios => oficios.toLowerCase().includes(filterValue));
  }
  //arreglo de string de ejemplos de asuntos de solicitudes
  oficios: string[] = [
    'Solicitud de Préstamo',
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
  oficiosArchivo: string[] = [
    '7.1-92/152 - Solicitud de Pretamo',
    '7.1-92.8/227 - CDP de Pago',
    '7.1-92.8/456 - Avance de Reintegro',
  ];

  fisico = false;
  virtual = false;
// Categorías de ASUNTO DEL DOCUMENTO según TRD
  categorias: string[] = [
    'Citación Reunión o Evento General - 7.1-52.5',
    'Citación de Comité Bienestar Universitario - 7.1-1.10',
    'Citación de Consejo de Cultura y Bienestar - 7.1-1.15',
    'Acta General - 7.1-1',
    'Acta de Comité de Bienestar Universitario - 7.1-1.10',
    'Acta de Consejo de Cultura y Bienestar 7.1-1.15',
    'Acta de Eliminación de Documentos de Archivo 7.1-1.43',
    'Acta de Reunión General - 7.1-1.56',
    'Acta de Comité Ad-Hoc de Asesoría y Consulta - 7.1-1.75', //Posiblemente a eliminar
    'Circular Informariva - 7.1-22.1',
    'Circular Normativa - 7.1-22.2',
    'Certifiado General - 7.1-20',
    'Certificación a Experto - 7.1-20', 
    'Certificado de Supervisoría - 7.1-20.8',
    'Certificación Laboral Orden de Prestación de Servicios (OPS) - 7.1-20.8',
    // 'Certificación de Pago Orden de Prestación de Servicios (OPS) - 7.1-20.8',
    'Certificado de Monitoría - 7.1-20.15',
    'Convenio - 7.1-32',
    'Convenio ICETEX - 7.1-32',
    'Solicitud Ampliación de Plazo ICETEX - 7.1-32',
    'Solicitud Giro Adicional ICETEX - 7.1-32',
    'Convocatoria - 7.1-33',
    'Convocatoria Grupos y Proyecto de Cultura y Bienestar - 7.1-33.4',
    'Informe - 7.1-52',
    'Informe Administrativo - 7.1-52.5',
    'Respuesta Asuntos Generales - 7.1-52.5',
    'Oficio Reporte - 7.1-52.5',
    'Remisión Oficio - 7.1-52.5',
    // 'Solicitud Liquidación Contrato - 7.1-52.5',
    'Infome de Eventos - 7.1-52.19',
    'Informe de Gestión - 7.1-52.20',
    'Informe Técnico - 7.1-52.43',
    'Informe Sistema Integrado de Gestión de Calidad - 7.1-52.46',
    'Registro Diario de Correspondencia - 7.1-53.7',
    'Formato Único de Inventario Documental - 7.1-53.9',
    'Resolución General - 7.1-90',
    'Resolución Vicerrectoría de Cultura y Bienestar - 7.1-90.13',
    'Solicitud General - 7.1-92',
    'Solicitud de Apoyo en Actividad - 7.1-92',
    'Solicitud Vinculación Monitores - 7.1-92',
    'Solicitud Avances o Viáticos - 7.1-92.1',
    'Solicitud Hospedaje o Alimentación - 7.1-92.1',
    'Solicitud Estímulo Económico - 7.1-92.1',
    'Solicitud de Servicio - 7.1-92.8',
    'Solicitud Certificado de Disponibilidad Presupuestal - 7.1-92.8',
    'Solicitud de Orden de Prestación de Servicios (OPS) - 7.1-92.8',
    'Solicitud de Contrato Proveedor - 7.1-92.8',
    'Solicitud de Pago a Experto- 7.1-92.8',
    'Solicitud de Tiquetes - 7.1-92.8',
    'Solicitud de Elementos de Consumo - 7.1-92.9',
    'Solicitud de Elementos Devolutivos - 7.1-92.10',
    'Solicitud de Mantenimiento de Equipos - 7.1-92.11',
    'Solicitud de Permisos y Compensatorios - 7.1-92.15',
    'Solicitud de Transporte - 7.1-92.25',
    'Solicitud de Vehículo - 7.1-92.25',
  ]



  onClickNO(): void {
    this.dialogRef.close();
  }

  crear() {
    const dialogRef = this.dialog.open(MainDocumentosVcbComponent, {
      disableClose: true,
      width: '700px',
      // height: '700px'
      // data: 'CONTENIDO'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }

  retomarDocumento = false;
  contestarDocumento = false;
  nuevoDocumento = false;

  onRadioChange(opcion: string) {
    if (opcion === 'nuevoDocumento') {
      this.retomarDocumento = false;
      this.contestarDocumento = false;
    }
    if (opcion === 'retomarDocumento') {
      this.contestarDocumento = false;
      this.nuevoDocumento = false;
    }
    if (opcion === 'contestarDocumento') {
      this.retomarDocumento = false;
      this.nuevoDocumento = false;
    }
  }
}
