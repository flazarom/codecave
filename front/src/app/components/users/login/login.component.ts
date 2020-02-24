import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./../../../services/auth.service";
import { Router, Data } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { auth, firestore } from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./../../../app.component.css", "./login.component.css"]
})
export class LoginComponent implements OnInit {
  public users = [];

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  loginButtons = true;

  registerFields = false;

  ngOnInit(): void {}

  // firstTime() va a comprobar si el usuario ya se registró, es decir, si completo sus datos, o simplemente ingresó
  firstTime() {
    // se llama al AuthService para obtener los datos del usuario
    this.authService.isAuth().subscribe(user => {
      if (user) {
        // comprueba si en la colección de firebase ya existe el ID del usuario
        this.firestore
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            if (doc.exists) {
              // si existe, lo manda a su profile
              this.router.navigate(["profile"]);
            } else {
              // caso contrario, se pide que complete sus datos
              this.loginButtons = false;
              this.registerFields = true;
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      }
    });
  }

  loginGoogle() {
    // el usuario se va a loguear con google como sea
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        // se llama a la función firstTime para saber si pedirle que complete los datos o para enviarlo a su perfil
        this.firstTime();
      })
      .catch(err => console.log("err", err.message));
  }
}
