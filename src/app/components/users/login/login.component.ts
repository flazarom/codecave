import { AngularFirestore } from "@angular/fire/firestore";
import { FirestoreService } from "./../../../services/firestore/firestore.service";
import { UserInterface } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { DataApiService } from "./../../../services/data-api.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { auth, firestore } from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public dataApi: DataApiService,
    public firestoreService: FirestoreService,
    private firestore: AngularFirestore
  ) {}

  user: UserInterface = {};

  ngOnInit(): void {}

  firstTime() {
    // this.authService.isAuth().subscribe(user => {
    //   if (user) {
    //     this.firestore
    //       .collection("regUsers")
    //       .doc(user.uid)
    //       .ref.get()
    //       .then(function(doc) {
    //         if (doc.exists) {
    //           console.log("existe");
    //           this.router.navigate(["profile"]);
    //         } else {
    //           console.log("no existe");
    //           this.router.navigate(["register"]);
    //         }
    //       })
    //       .catch(function(error) {
    //         console.log("Error getting document:", error);
    //       });
    //   }
    // });
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.firestore
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            if (doc.exists) {
              console.log("existe");
              this.router.navigate(["profile"]);
            } else {
              console.log("no existe");
              this.router.navigate(["register"]);
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
    });
  }

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        this.firstTime();
      })
      .catch(err => console.log("err", err.message));
  }
}
