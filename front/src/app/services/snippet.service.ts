import { HttpClient } from '@angular/common/http';
import { Snippet } from './../models/snippet';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  selectedSnippet: Snippet;
  snippets: Snippet[];

  readonly URL_API = 'http://localhost:3000/api/snippets';

  constructor(private http: HttpClient) {
    this.selectedSnippet = new Snippet();
  }

  postSnippet(snippet: Snippet) {
    return this.http.post(this.URL_API, snippet);
  }

  getSnippets() {
    return this.http.get(this.URL_API);
  }

  getSnippet(_id: string){
    return this.http.get<Snippet>(this.URL_API + `/${_id}`);
  }

  putSnippet(snippet: Snippet) {
    return this.http.put(this.URL_API + `/${snippet._id}`, snippet);
  }

  deleteSnippet(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
