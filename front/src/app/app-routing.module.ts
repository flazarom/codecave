import { OnetutorialComponent } from "./components/sections/tutoriales/onetutorial/onetutorial.component";
import { OnepreguntaComponent } from "./components/sections/preguntas/onepregunta/onepregunta.component";
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { PortalComponent } from "./components/portal/portal.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: PortalComponent },
  { path: "users/:username", component: ProfileComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "preguntas/:id", component: OnepreguntaComponent },
  { path: "tutoriales/:id", component: OnetutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
