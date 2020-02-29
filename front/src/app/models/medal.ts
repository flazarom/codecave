export class Medal {
  constructor(_id = "", medalname = "", medaldesc = "") {
    this._id = _id;
    this.medalname = medalname;
    this.medaldesc = medaldesc;
  }
  _id: string;
  medalname: string;
  medaldesc: string;
}
