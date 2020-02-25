import { PreguntaComponent } from "./components/getOne/pregunta/pregunta.component";
import { TutorialComponent } from "./components/getOne/tutorial/tutorial.component";
import { SnippetComponent } from "./components/getOne/snippet/snippet.component";
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
  { path: "snippets/:id", component: SnippetComponent },
  { path: "tutoriales/:id", component: TutorialComponent },
  { path: "preguntas/:id", component: PreguntaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
