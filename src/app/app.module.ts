import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrincipalMenuComponent } from './principal-menu/principal-menu.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { DocumentPanelComponent } from './document-panel/document-panel.component';
import { EventPanelComponent } from './event-panel/event-panel.component';
import { HomeModuleComponent } from './home-module/home-module.component';
import {MatCardModule} from '@angular/material/card';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { BudgetPanelComponent } from './budget-panel/budget-panel.component';
import { PlacePanelComponent } from './place-panel/place-panel.component';
import { DocumentModuleComponent } from './document-module/document-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { EventModuleComponent } from './event-module/event-module.component';
import { EventoActividadComponent } from './dialogs/evento-actividad/evento-actividad.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatRadioModule } from '@angular/material/radio';
import { FeriaComponent } from './feria/feria.component';
import { DocumentoRecepcionComponent } from './dialogs/documento-recepcion/documento-recepcion.component';
import { EventoCrearComponent } from './dialogs/evento-crear/evento-crear.component';
import { RegistarAsistenteComponent } from './dialogs/registar-asistente/registar-asistente.component';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NumeroFormateadoPipe } from './config/numero-formateado.pipe';
import { DocumentoVcbComponent } from './dialogs/documento-vcb/documento-vcb.component';
import { ViajeAereoComponent } from './dialogs/viajeAereo/viaje-aereo/viaje-aereo.component';
import { MainDocumentosVcbComponent } from './dialogs/main-documentos-vcb/main-documentos-vcb.component';
import { SolicitudCdpComponent } from './dialogs/documental/solicitudes/solicitud-cdp/solicitud-cdp.component';
import { SolicitudTiquetesComponent } from './dialogs/documental/solicitudes/solicitud-tiquetes/solicitud-tiquetes.component';
import { SolicitudVehiculoComponent } from './dialogs/documental/solicitudes/solicitud-vehiculo/solicitud-vehiculo.component';
import { InformeAdministrativoComponent } from './dialogs/documental/informe/informe-administrativo/informe-administrativo.component';
import { BienvenidaEstudiantesComponent } from './bienvenida-estudiantes/bienvenida-estudiantes.component';
import { RegistrarEntregaSouvenirComponent } from './dialogs/registrar-entrega-souvenir/registrar-entrega-souvenir.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomePageComponent,
    NumeroFormateadoPipe,
    PrincipalMenuComponent,
    LoginPanelComponent,
    DocumentPanelComponent,
    EventPanelComponent,
    CanvasJSChart,
    HomeModuleComponent,
    BudgetPanelComponent,
    PlacePanelComponent,
    DocumentModuleComponent,
    RegistroUsuarioComponent,
    EventModuleComponent,
    EventoActividadComponent,
    FeriaComponent,
    DocumentoRecepcionComponent,
    EventoCrearComponent,
    RegistarAsistenteComponent,
    DocumentoVcbComponent,
    ViajeAereoComponent,
    MainDocumentosVcbComponent,
    SolicitudCdpComponent,
    SolicitudTiquetesComponent,
    SolicitudVehiculoComponent,
    InformeAdministrativoComponent,
    BienvenidaEstudiantesComponent,
    RegistrarEntregaSouvenirComponent,

  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatPaginatorModule,
    MatInputModule,
    AutocompleteLibModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe,
    MainPageComponent,
    FeriaComponent
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
