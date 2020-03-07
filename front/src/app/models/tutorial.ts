export class Tutorial {
  constructor(
    _id = "",
    contenido = "",
    category = "",
    title = "",
    likes = 0,
    owner = ""
  ) {
    this._id = _id;
    this.contenido = contenido;
    this.category = category;
    this.title = title;
    this.likes = likes;
    this.owner = owner;
  }

  _id: string;
  title: string;
  contenido: string;
  category: string;
  likes: number;
  owner: string;
}
