export class Pregunta {
  constructor(
    _id = "",
    pregunta = "",
    category = "",
    details = "",
    likes = [],
    owner = ""
  ) {
    this._id = _id;
    this.pregunta = pregunta;
    this.category = category;
    this.details = details;
    this.likes = likes;
    this.owner = owner;
  }

  _id: string;
  pregunta: string;
  category: string;
  details: string;
  likes: string[];
  owner: string;
}
