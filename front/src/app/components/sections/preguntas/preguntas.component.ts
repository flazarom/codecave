import { Pregunta } from "./../../../models/pregunta";
import { PreguntaService } from "./../../../services/pregunta.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-preguntas",
  templateUrl: "./preguntas.component.html",
  styleUrls: ["./preguntas.component.css"],
  providers: [PreguntaService]
})
export class PreguntasComponent implements OnInit {
  constructor(protected preguntaService: PreguntaService) {}

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
    });
  }

}
