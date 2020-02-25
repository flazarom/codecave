export class Pregunta {
  constructor(_id = "", pregunta = "", categoria = "", desarrollo = "", likes = 0, creador = "") {
    this._id = _id;
    this.pregunta = pregunta;
    this.categoria = categoria;
    this.desarrollo = desarrollo;
    this.likes = likes;
    this.creador = creador;
  }

  _id: string;
  pregunta: string;
  categoria: string;
  desarrollo: string;
  likes: number;
  creador: string;
}
