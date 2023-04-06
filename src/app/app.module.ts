import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrincipalMenuComponent } from './principal-menu/principal-menu.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { DocumentPanelComponent } from './document-panel/document-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomePageComponent,
    PrincipalMenuComponent,
    LoginPanelComponent,
    HomePanelComponent,
    DocumentPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
