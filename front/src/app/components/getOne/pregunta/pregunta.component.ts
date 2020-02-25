import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from './../../../services/pregunta.service';
import { Pregunta } from './../../../models/pregunta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  pregunta: Pregunta = {
    _id: '',
    desarrollo: '',
    categoria: '',
    pregunta: '',
    likes: 0,
    creador: ''
  };

  constructor(public preguntaService: PreguntaService,
      private activeRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activeRoute.params.subscribe(
      res => {
        this.traerPregunta(res.id);
      }
    )
  }

  traerPregunta(_id: string) {
    this.preguntaService.getPregunta(_id).subscribe(res => {
      this.pregunta = res as Pregunta;
      console.log(this.pregunta)
    });
  }
}
