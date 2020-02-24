import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./../../../app.component.css", "./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public users = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.dataApi.getUsers().subscribe(uersSnapshot => {
    //   this.users = [];
    //   uersSnapshot.forEach((userData: any) => {
    //     this.users.push({
    //       id: userData.payload.doc.id,
    //       data: userData.payload.doc.data()
    //     });
    //   });
    // });
  }

  // register() {
  //   this.authService.isAuth().subscribe(user => {
  //     if (user) {
  //       this.user.uid = user.uid;
  //       this.user.displayName = user.displayName;
  //       this.user.photoUrl = user.photoURL;
  //     }
  //     this.dataApi.createUser({
  //       displayName: this.user.displayName,
  //       photoUrl: this.user.photoUrl,
  //       uid: this.user.uid
  //     });
  //   });
  // }
}
