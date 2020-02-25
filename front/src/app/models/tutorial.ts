export class Tutorial {
  constructor(_id = "", contenido = "", categoria = "", title = "", likes = 0, creador = "") {
    this._id = _id;
    this.contenido = contenido;
    this.categoria = categoria;
    this.title = title;
    this.likes = likes;
    this.creador = creador;
  }

  _id: string;
  title: string;
  contenido: string;
  categoria: string;
  likes: number;
  creador: string;
}
