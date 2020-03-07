export class User {
  constructor(
    _id = "",
    username = "",
    email = "",
    photoUrl = "",
    bio = "",
    web = "",
    medals = [],
    contact = []
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.photoUrl = photoUrl;
    this.bio = bio;
    this.web = web;
    this.contact = contact;
    this.medals = medals;
  }

  _id: string;
  username: string;
  email: string;
  photoUrl: string;
  bio: string;
  web: string;
  medals: Array<string>;
  contact: Array<string>;
}
