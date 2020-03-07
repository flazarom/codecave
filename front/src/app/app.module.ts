import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

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
import { HttpClientModule } from "@angular/common/http";
import { TutorialComponent } from "./components/getOne/tutorial/onetutorial.component";
import { SnippetComponent } from "./components/getOne/snippet/onesnippet.component";
import { PreguntaComponent } from "./components/getOne/pregunta/onepregunta.component";
import { LiteprofileComponent } from "./components/users/liteprofile/liteprofile.component";
import { ProfileownerComponent } from "./components/users/profileowner/profileowner.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; //Importacion de bootstrap para angular NG-B. No es lo mismo que NGX son dos proyectos distintos

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
    TutorialComponent,
    LiteprofileComponent,
    ProfileownerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AngularFireAuth,
    ProfileComponent,
    LiteprofileComponent,
    ProfileownerComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //Declaracion de que la estructura de nuestro HTML sera personalizada.
})
export class AppModule {}
