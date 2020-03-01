export class Medal {
  constructor(_id = "", medalid = "", medalname = "", medaldesc = "") {
    this._id = _id;
    this.medalid = medalid;
    this.medalname = medalname;
    this.medaldesc = medaldesc;
  }
  _id: string;
  medalid: string;
  medalname: string;
  medaldesc: string;
}
