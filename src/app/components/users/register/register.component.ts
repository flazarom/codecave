import { AuthService } from "./../../../services/auth.service";
import { FirestoreService } from "./../../../services/firestore/firestore.service";
import { UserInterface } from "./../../../models/user";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./../../../app.component.css", "./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public users = [];

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  user: UserInterface = {
    photoUrl: "",
    uid: ""
  };

  ngOnInit(): void {
    this.firestoreService.getUsers().subscribe(uersSnapshot => {
      this.users = [];
      uersSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          data: userData.payload.doc.data()
        });
      });
    });
  }

  register() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.uid = user.uid;
        this.user.displayName = user.displayName;
        this.user.photoUrl = user.photoURL;
      }
      this.firestoreService.createUser({
        displayName: this.user.displayName,
        photoUrl: this.user.photoUrl,
        uid: this.user.uid
      });
    });
  }
}
