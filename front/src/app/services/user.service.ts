import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  selectedUser: User;
  users: User[];

  readonly URL_API = "http://localhost:3000/api/users";

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  postUser(user: User) {
    console.log("post User");
    return this.http.post(this.URL_API, user);
  }

  getUsers() {
    return this.http.get(this.URL_API);
  }

  getUser(_id: string) {
    return this.http.get<User>(this.URL_API + `/${_id}`);
  }

  putUser(user: User) {
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
