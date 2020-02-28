import { Router } from '@angular/router';
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
  cargando: boolean = true;
  constructor(public preguntaService: PreguntaService, private route: Router) {

  }

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
    });
  }

  verPregunta(_id: String){
    this.route.navigate(['preguntas/'+_id]);
  }

  darLike(pregunta: Pregunta){
    pregunta.likes++;
    this.preguntaService.putPregunta(pregunta).subscribe(
      res => {
        this.getPreguntas();
      }
    )
  }

}
