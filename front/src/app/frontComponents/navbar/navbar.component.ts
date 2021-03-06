import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";

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
    private fs: AngularFirestore
  ) {}

  public isLogged: boolean;

  ngOnInit() {
    this.getCurrentUser();
  }

  ingresar() {
    this.loginGoogle();
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

  loginGoogle() {
    // abre un popup de inicio ce sesión con google usando firebase
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        console.log("user logged");
        // cuando se loguea comprobamos si es la primera vez
        this.firstTime();
      })
      .catch(err => console.log("err", err.message));
  }

  firstTime() {
    // se llama al AuthService para obtener los datos del usuario
    this.authService.isAuth().subscribe(user => {
      if (user) {
        // comprueba si en la colección de firebase ya existe el ID del usuario
        this.fs
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            try {
              if (doc.exists) {
                // obtenemos el nombre de usuario y lo usamos para enviarlo a
                // la ruta de su perfil
                let username = doc.get("username");
                this.router.navigate([username]);
              } else {
                // si no existe en la coleccion de firebase, es xq aun no se registra,
                // asi que le ponemos el formulario
                this.router.navigate(["login"]);
              }
            } catch {
              this.router.navigate(["login"]);
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  gotoProfile() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        // comprueba si en la colección de firebase ya existe el ID del usuario
        this.fs
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            let username = doc.get("username");
            this.router.navigate([username]);
          });
      }
    });
  }

  gotoHome() {
    this.router.navigate([""]);
  }
}
