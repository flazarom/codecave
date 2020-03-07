export class Snippet {
  constructor(
    _id = "",
    titulo = "",
    lenguaje = "",
    desarrollo = "",
    likes = 0,
    owner = ""
  ) {
    this._id = _id;
    this.lenguaje = lenguaje;
    this.titulo = titulo;
    this.desarrollo = desarrollo;
    this.likes = likes;
    this.owner = owner;
  }

  _id: string;
  titulo: string;
  lenguaje: string;
  desarrollo: string;
  likes: number;
  owner: string;
}
