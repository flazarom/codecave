import { UserService } from "./../../../services/user.service";
import { User } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./../../../app.component.css", "./profile.component.css"]
})
export class ProfileComponent implements OnInit {
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

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(res => {
      console.log(res.id);
      this.getUser(res.id);
    });
  }

  getUser(_id: string) {
    this.userService.getUser(_id).subscribe(res => {
      this.user = res as User;
      console.log(this.user);
    });
  }
}
