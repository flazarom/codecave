import { Router } from "@angular/router";
import { Pregunta } from "./../../../models/pregunta";
import { PreguntaService } from "./../../../services/pregunta.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-preguntas",
  templateUrl: "./preguntas.component.html",
  styleUrls: ["./../../../app.component.css", "./preguntas.component.css"]
})
export class PreguntasComponent implements OnInit {
  cargando: boolean = true;
  constructor(
    public preguntaService: PreguntaService,
    private router: Router
  ) {}

  page = 1; //Pagina en la cual inicia
  pageSize = 10; //Cantidad de entradas que tendra la pagina
  collectionSize; //Longitud de la coleccion

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
      this.collectionSize = this.preguntaService.preguntas.length; // Lo guardo aparte porque sino en el html me trae problemas
    });
  }

  verPregunta(_id: String) {
    console.log("ver");
    this.router.navigate(["preguntas/" + _id]);
  }
}
