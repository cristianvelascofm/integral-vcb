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

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { BudgetPanelComponent } from './budget-panel/budget-panel.component';
import { PlacePanelComponent } from './place-panel/place-panel.component';
import { DocumentModuleComponent } from './document-module/document-module.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon'
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomePageComponent,
    PrincipalMenuComponent,
    LoginPanelComponent,
    DocumentPanelComponent,
    EventPanelComponent,
    CanvasJSChart,
    HomeModuleComponent,
    BudgetPanelComponent,
    PlacePanelComponent,
    DocumentModuleComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    AutocompleteLibModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
