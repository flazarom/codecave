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
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
