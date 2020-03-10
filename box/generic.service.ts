import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export abstract class GenericService<E> {
  protected miUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(): Observable<E[]> {
    return this.http.get<E[]>(this.miUrl);
  }

  getOne(id: string): Observable<E> {
    return this.http.get<E>(this.miUrl + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id);
  }

  post(entity: E): Observable<E> {
    return this.http.post<E>(this.miUrl, entity);
  }

  //Aca esta el problema, Necesitamos manejar todo con una sola entity
  put(id: string, entity: E) {
    return this.http.put<E>(this.miUrl + id, entity);
  }
}
