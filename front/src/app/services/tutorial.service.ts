import { HttpClient } from "@angular/common/http";
import { Tutorial } from "./../models/tutorial";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TutorialService {
  selectedTutorial: Tutorial;
  tutoriales: Tutorial[];

  readonly URL_API = "http://localhost:3000/api/tutoriales";

  constructor(private http: HttpClient) {
    this.selectedTutorial = new Tutorial();
  }

  postTutorial(tutorial: Tutorial) {
    return this.http.post(this.URL_API, tutorial);
  }

  getTutoriales() {
    return this.http.get(this.URL_API);
  }

  getTutorial(_id: string) {
    return this.http.get<Tutorial>(this.URL_API + `/${_id}`);
  }

  putTutorial(tutorial: Tutorial) {
    return this.http.put(this.URL_API + `/${tutorial._id}`, tutorial);
  }

  deleteTutorial(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
