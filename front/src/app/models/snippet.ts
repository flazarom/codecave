export class Snippet {

  constructor(_id = "", titulo = "", lenguaje="", desarrollo = "") {
    this._id = _id;
    this.lenguaje = lenguaje;
    this.titulo = titulo;
    this.desarrollo = desarrollo;
  }

  _id: string;
  titulo: string;
  lenguaje: string;
  desarrollo: string;
}
