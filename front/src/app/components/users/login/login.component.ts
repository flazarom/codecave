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
  registerButtons = false;

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        console.log("user logged");
        this.firstTime();
      })
      .catch(err => console.log("err", err.message));
  }

  register() {
    this.authService.isAuth().subscribe(user => {
      let photoUrl;
      if (document.forms["registerForm"]["photoUrl"].value == "") {
        photoUrl = user.photoURL;
      } else {
        photoUrl = document.forms["registerForm"]["photoUrl"].value == "";
      }
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

      console.log(userData.github);

      this.userService.postUser(userData).subscribe(res => {
        console.log("posted");
      });

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
    // se llama al AuthService para obtener los datos del usuario
    this.loginButtons = false;

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
                let username = doc.get("username");
                this.router.navigate(["users", username]);
              } else {
                this.registerButtons = true;
              }
            } catch {
              this.registerButtons = true;
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      }
    });
  }
}
