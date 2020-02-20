import { DataApiService } from "./../../services/data-api.service";
import { AuthService } from "./../../services/auth.service";
import { AppRoutingModule } from "./../../app-routing.module";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, app } from "firebase/app";
import { AotCompiler } from "@angular/compiler";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css", "./../../app.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public dataApi: DataApiService
  ) {}

  public isLogged: boolean;

  ngOnInit() {
    this.getCurrentUser();
  }

  ingresar() {
    this.router.navigate(["login"]);
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log("user logged");
        this.isLogged = true;
      } else {
        console.log("NOT user logged");
        this.isLogged = false;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([""]);
  }
}
