import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Medal } from "../models/medal";

@Injectable({
  providedIn: "root"
})
export class MedalService {
  selectedMedal: Medal;
  medals: Medal[];

  readonly URL_API = "http://localhost:3000/api/medals";

  constructor(private http: HttpClient) {
    this.selectedMedal = new Medal();
  }

  postMedal(medal: Medal) {
    console.log("post Medal");
    return this.http.post(this.URL_API, medal);
  }

  getMedals() {
    return this.http.get(this.URL_API);
  }

  getMedal(_id: string) {
    return this.http.get<Medal>(this.URL_API + `/${_id}`);
  }

  putMedal(medal: Medal) {
    return this.http.put(this.URL_API + `/${medal._id}`, medal);
  }

  deleteMedal(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
