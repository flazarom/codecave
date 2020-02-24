import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TutorialesComponent } from "./components/sections/tutoriales/tutoriales.component";
import { PreguntasComponent } from "./components/sections/preguntas/preguntas.component";
import { SnippetsComponent } from "./components/sections/snippets/snippets.component";
import { EmptyComponent } from "./components/empty/empty.component";
import { PortalComponent } from "./components/portal/portal.component";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { LoginComponent } from "./components/users/login/login.component";
import { HttpClientModule } from '@angular/common/http';
import { PreguntaComponent } from './components/getOne/pregunta/pregunta.component';
import { SnippetComponent } from './components/getOne/snippet/snippet.component';
import { TutorialComponent } from './components/getOne/tutorial/tutorial.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutorialesComponent,
    PreguntasComponent,
    SnippetsComponent,
    EmptyComponent,
    PortalComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    PreguntaComponent,
    SnippetComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
