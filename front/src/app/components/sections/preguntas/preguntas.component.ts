import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../../services/auth.service";
import { Router } from "@angular/router";
import { Pregunta } from "./../../../models/pregunta";
import { PreguntaService } from "./../../../services/pregunta.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-preguntas",
  templateUrl: "./preguntas.component.html",
  styleUrls: ["./../../../app.component.css", "./preguntas.component.css"],
  providers: [PreguntaService]
})
export class PreguntasComponent implements OnInit {
  cargando: boolean = true;
  constructor(
    public preguntaService: PreguntaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
    });
  }

  verPregunta(_id: String) {
    this.router.navigate(["preguntas/" + _id]);
  }
}
