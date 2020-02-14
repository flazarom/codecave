import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TutorialesComponent } from './tutoriales/tutoriales.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutorialesComponent,
    PreguntasComponent,
    SnippetsComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
