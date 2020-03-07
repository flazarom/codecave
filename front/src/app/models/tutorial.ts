export class Tutorial {
  constructor(
    _id = "",
    title = "",
    tutorial = "",
    category = "",
    likes = [],
    owner = ""
  ) {
    this._id = _id;
    this.title = title;
    this.tutorial = tutorial;
    this.category = category;
    this.likes = likes;
    this.owner = owner;
  }

  _id: string;
  title: string;
  tutorial: string;
  category: string;
  likes: Array<string>;
  owner: string;
}
