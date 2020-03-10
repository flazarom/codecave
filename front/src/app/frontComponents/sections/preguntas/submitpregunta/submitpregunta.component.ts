import { UserService } from "./../../../../services/user.service";
import { User } from "./../../../../models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./../../../../services/auth.service";
import { Router, Data } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { auth, firestore } from "firebase/app";
@Component({
  selector: "app-submitpregunta",
  templateUrl: "./submitpregunta.component.html",
  styleUrls: ["./submitpregunta.component.css"]
})
export class SubmitpreguntaComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private fs: AngularFirestore,
    private userService: UserService
  ) {}

  user: User = {
    _id: "",
    username: "",
    email: "",
    photoUrl: "",
    bio: "",
    web: "",
    medals: [],
    contact: []
  };

  ngOnInit(): void {}

  loginButtons = true;
  showRegisterForm = false;

  //validators

  isUserNameLength = false;
  isUsernameNoSpaces = false;
  isUsernameAvailable = false;
  usernameValid;

  usernameSpaces(username) {
    var noValido = /\s/;
    if (noValido.test(username)) {
      this.isUsernameNoSpaces = false;
    } else {
      this.isUsernameNoSpaces = true;
    }
  }

  usernameLength(username) {
    if (username.length <= 16) {
      this.isUserNameLength = true;
    } else {
      this.isUserNameLength = false;
    }
  }

  usernameAvailable(username) {
    this.userService.getUser(username).subscribe(userData => {
      if (userData) {
        this.isUsernameAvailable = false;
      } else {
        this.isUsernameAvailable = true;
      }
    });
  }

  async checkUsername() {
    let username = document.forms["registerForm"]["username"].value;
    await this.usernameAvailable(username);
    await this.resolveAfter();
    console.log("cambio");
    this.usernameLength(username);
    this.usernameSpaces(username);
    if (
      this.isUserNameLength == true &&
      this.isUsernameNoSpaces == true &&
      this.isUsernameAvailable == true
    ) {
      this.usernameValid = true;
      console.log("valido");
      console.log("length ", this.isUserNameLength);
      console.log("spaces ", this.isUsernameNoSpaces);
      console.log("available ", this.isUserNameLength);
    } else {
      this.usernameValid = false;
      console.log("invalido");
    }
  }

  resolveAfter() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("resolved");
      }, 500);
    });
  }

  submit() {
    this.authService.isAuth().subscribe(user => {
      let userData = {
        _id: document.forms["registerForm"]["username"].value,
        username: document.forms["registerForm"]["username"].value,
        email: user.email,
        photoUrl: document.forms["registerForm"]["photoUrl"].value,
        bio: document.forms["registerForm"]["bio"].value,
        web: document.forms["registerForm"]["web"].value,
        github: document.forms["registerForm"]["github"].value,
        gitlab: document.forms["registerForm"]["gitlab"].value,
        bitbucket: document.forms["registerForm"]["bitbucket"].value,
        medals: []
      };
      let bioValue: string = document.forms["registerForm"]["bio"].value;
      console.log(bioValue);
      if (bioValue.length >= 16) {
        userData.medals.push("newfulluser");
      }
      this.userService.postUser(userData).subscribe(res => {
        console.log("posted");
      });
      // añadimos la uid (id de google) del usuario a una coleccion en firebase
      // para que la proxima vez q se loguee no le pida registrarse
      this.fs
        .collection("regUsers")
        .doc(user.uid)
        .set({
          uid: user.uid,
          username: userData.username,
          email: userData.email
        });

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
              this.router.navigate([username]);
            })
            .catch(function(err) {
              console.log("err", err);
            });
        }
      });
    });
  }
}
