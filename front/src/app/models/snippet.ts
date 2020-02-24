export class Snippet {

  constructor(_id = "", titulo = "", lenguaje="", categoria = "", desarrollo = "") {
    this._id = _id;
    this.lenguaje = lenguaje;
    this.titulo = titulo;
    this.categoria = categoria;
    this.desarrollo = desarrollo;
  }

  _id: string;
  titulo: string;
  lenguaje: string;
  categoria: string;
  desarrollo: string;
}
