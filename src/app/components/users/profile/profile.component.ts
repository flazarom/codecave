import { UserInterface } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: UserInterface = {
    uid: "",
    displayName: "",
    photoUrl: ""
  };

  public providerId: string = "null";

  ngOnInit(): void {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.uid = user.uid;
        this.user.displayName = user.displayName;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }
}
