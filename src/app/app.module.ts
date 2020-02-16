import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TutorialesComponent } from './components/secciones/tutoriales/tutoriales.component';
import { PreguntasComponent } from './components/secciones/preguntas/preguntas.component';
import { SnippetsComponent } from './components/secciones/snippets/snippets.component';
import { EmptyComponent } from './components/empty/empty.component';
import { PortalComponent } from './components/portal/portal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutorialesComponent,
    PreguntasComponent,
    SnippetsComponent,
    EmptyComponent,
    PortalComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
