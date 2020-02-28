export class User {
  constructor(
    _id = "",
    username = "",
    email = "",
    photoUrl = "",
    bio = "",
    web = "",
    github = "",
    gitlab = "",
    bitbucket = "",
    medallas = []
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.photoUrl = photoUrl;
    this.bio = bio;
    this.web = web;
    this.github = github;
    this.gitlab = gitlab;
    this.bitbucket = bitbucket;
    this.medallas = medallas;
  }

  _id: string;
  username: string;
  email: string;
  photoUrl: string;
  bio: string;
  web: string;
  github: string;
  gitlab: string;
  bitbucket: string;
  medallas: Array<String>;
}
