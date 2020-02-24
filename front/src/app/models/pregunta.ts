export class Pregunta {
  constructor(_id = "", pregunta = "", categoria = "", desarrollo = "") {
    this._id = _id;
    this.pregunta = pregunta;
    this.categoria = categoria;
    this.desarrollo = desarrollo;
  }

  _id: string;
  pregunta: string;
  categoria: string;
  desarrollo: string;
}
