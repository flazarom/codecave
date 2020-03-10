import { MedalsManagerComponent } from "./backComponents/medals-manager/medals-manager.component";
import { OnetutorialComponent } from "./frontComponents/sections/tutoriales/onetutorial/onetutorial.component";
import { OnepreguntaComponent } from "./frontComponents/sections/preguntas/onepregunta/onepregunta.component";
import { LoginComponent } from "./frontComponents/users/login/login.component";
import { RegisterComponent } from "./frontComponents/users/register/register.component";
import { PortalComponent } from "./frontComponents/portal/portal.component";
import { ProfileComponent } from "./frontComponents/users/profile/profile.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: PortalComponent },
  { path: ":username", component: ProfileComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "preguntas/:id", component: OnepreguntaComponent },
  { path: "tutoriales/:id", component: OnetutorialComponent },
  //admin routes
  { path: "admin/medals", component: MedalsManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
