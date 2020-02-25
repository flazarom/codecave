import { UserService } from "./../../../services/user.service";
import { ProfileComponent } from "./../profile/profile.component";
import { User } from "./../../../models/user";
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
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private fs: AngularFirestore,
    public profile: ProfileComponent,
    private userService: UserService
  ) {}

  user: User = {
    _id: "",
    username: "",
    email: "",
    photoUrl: "",
    bio: "",
    web: "",
    github: "",
    gitlab: "",
    bitbucket: ""
  };

  ngOnInit(): void {}

  loginButtons = true;
  showRegisterForm = true;

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

  //utilizamos onload y onerror para saber si la imagen va a cargar o no
  checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
  }

  register() {
    this.authService.isAuth().subscribe(user => {
      //guardamos la foto que utilizo el usuario
      let photoUrl = document.forms["registerForm"]["photoUrl"].value;
      this.checkImage(
        photoUrl,
        //si la foto existe, joya
        function() {
          console.log("Image exists");
        },
        //si no existe, usamos la foto que tiene en google y chau jaja
        function() {
          console.log("Image doesn't exists");
          photoUrl = user.email;
        }
      );

      // guardamos todo el formulario en un objeto, esto si despues lo podemos pasar a
      // reactivo, mejor
      let userData = {
        _id: document.forms["registerForm"]["username"].value,
        username: document.forms["registerForm"]["username"].value,
        email: user.email,
        photoUrl: photoUrl,
        bio: document.forms["registerForm"]["bio"].value,
        web: document.forms["registerForm"]["web"].value,
        github: document.forms["registerForm"]["github"].value,
        gitlab: document.forms["registerForm"]["gitlab"].value,
        bitbucket: document.forms["registerForm"]["bitbucket"].value
      };

      // creamos el usuario en la base de datos
      this.userService.postUser(userData).subscribe(res => {
        console.log("posted");
      });

      // añadimos la uid (id de google) del usuario a una coleccion en firebase
      // para que la proxima vez q se loguee no le pida registrarse
      this.fs
        .collection("regUsers")
        .doc(user.uid)
        .set({ uid: user.uid, username: userData.username });

      this.authService.isAuth().subscribe(user => {
        if (user) {
          // comprueba si en la colección de firebase ya existe el ID del usuario
          this.fs
            .collection("regUsers")
            .doc(user.uid)
            .ref.get()
            .then(doc => {
              // obtenemos el nombre de usuario y lo usamos para enviarlo a
              // la ruta de su perfil
              let username = doc.get("username");
              this.router.navigate(["users", username]);
            })
            .catch(function(err) {
              console.log("err", err);
            });
        }
      });
    });
  }

  firstTime() {
    this.loginButtons = false;

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
                this.router.navigate(["users", username]);
              } else {
                // si no existe en la coleccion de firebase, es xq aun no se registra,
                // asi que le ponemos el formulario
                this.showRegisterForm = true;
              }
            } catch {
              this.showRegisterForm = true;
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      }
    });
  }
}
