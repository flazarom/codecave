import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afsAuth: AngularFireAuth) {}
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
