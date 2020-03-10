import { OnetutorialComponent } from "./frontComponents/sections/tutoriales/onetutorial/onetutorial.component";
import { OnepreguntaComponent } from "./frontComponents/sections/preguntas/onepregunta/onepregunta.component";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./frontComponents/navbar/navbar.component";
import { TutorialesComponent } from "./frontComponents/sections/tutoriales/tutoriales.component";
import { PreguntasComponent } from "./frontComponents/sections/preguntas/preguntas.component";
import { EmptyComponent } from "./frontComponents/empty/empty.component";
import { PortalComponent } from "./frontComponents/portal/portal.component";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { ProfileComponent } from "./frontComponents/users/profile/profile.component";
import { RegisterComponent } from "./frontComponents/users/register/register.component";
import { LoginComponent } from "./frontComponents/users/login/login.component";
import { HttpClientModule } from "@angular/common/http";

import { LiteprofileComponent } from "./frontComponents/users/liteprofile/liteprofile.component";
import { ProfileownerComponent } from "./frontComponents/users/profileowner/profileowner.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MedalsManagerComponent } from "./backComponents/medals-manager/medals-manager.component"; //Importacion de bootstrap para angular NG-B. No es lo mismo que NGX son dos proyectos distintos

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutorialesComponent,
    PreguntasComponent,
    EmptyComponent,
    PortalComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    LiteprofileComponent,
    ProfileownerComponent,
    OnepreguntaComponent,
    OnetutorialComponent,
    MedalsManagerComponent
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
    ProfileownerComponent,
    MedalsManagerComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //Declaracion de que la estructura de nuestro HTML sera personalizada.
})
export class AppModule {}
