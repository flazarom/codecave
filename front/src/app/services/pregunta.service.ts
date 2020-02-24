import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  selectedPregunta: Pregunta;
  preguntas: Pregunta[];

  readonly URL_API = 'http://localhost:3000/api/preguntas';

  constructor(private http: HttpClient) {
    this.selectedPregunta = new Pregunta();
  }

  postPregunta(pregunta: Pregunta) {
    return this.http.post(this.URL_API, pregunta);
  }

  getPreguntas() {
    return this.http.get(this.URL_API);
  }

  putPregunta(pregunta: Pregunta) {
    return this.http.put(this.URL_API + `/${pregunta._id}`, pregunta);
  }

  deletePregunta(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
