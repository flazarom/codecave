import { MedalService } from "./../../../services/medal.service";
import { UserService } from "./../../../services/user.service";
import { User } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

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
    bitbucket: "",
    medallas: []
  };

  medallas = [];
  altMedallas = [];
  noMedals;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private medalService: MedalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading();
    this.activeRoute.params.subscribe(res => {
      this.getUser(res.username);
    });
  }

  cargando: boolean = true;

  loading() {
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  getUser(username: string) {
    this.userService.getUser(username).subscribe(res => {
      this.user = res as User;
      // console.log(this.user);
      // var imgSrc = new Image();
      // imgSrc.src = this.user.photoUrl;
      // if (imgSrc.height != 0) {
      //   console.log("ee");
      // } else {
      //   this.user.photoUrl =
      //     "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      // }
      this.medallas = res.medallas;
      this.setAlts();
    });
  }

  setAlts() {
    for (let i = 0; i < this.medallas.length; i++) {
      this.medalService.getMedal(this.medallas[i]).subscribe(medal => {
        this.altMedallas.push(medal);
      });
    }
    if (this.medallas.length == 0) {
      this.noMedals = true;
    }
  }

  getMedals() {
    return this.altMedallas;
  }
}
