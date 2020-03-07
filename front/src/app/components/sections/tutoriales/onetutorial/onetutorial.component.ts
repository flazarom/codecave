import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./../../../../models/user";
import { UserService } from "./../../../../services/user.service";
import { AuthService } from "./../../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TutorialService } from "./../../../../services/tutorial.service";
import { Tutorial } from "./../../../../models/tutorial";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tutorial",
  templateUrl: "./onetutorial.component.html",
  styleUrls: ["./onetutorial.component.css"]
})
export class OnetutorialComponent implements OnInit {
  tutorial: Tutorial = {
    _id: "",
    title: "",
    tutorial: "",
    category: "",
    likes: [],
    owner: ""
  };

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

  likes: number;
  liked: boolean;

  constructor(
    public tutorialService: TutorialService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fs: AngularFirestore,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.activeRoute.params.subscribe(res => {
      this.getUser();
      this.getTutorial(res.id);
    });
    await this.resolveAfter();
    this.getLiked();
  }

  getUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        // comprueba si en la colección de firebase ya existe el ID del usuario
        this.fs
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            this.userService.getUser(doc.get("username")).subscribe(user => {
              this.user = user as User;
            });
          });
      }
    });
  }

  resolveAfter() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  async getTutorial(_id: string) {
    await this.tutorialService.getTutorial(_id).subscribe(res => {
      this.tutorial = res as Tutorial;
      this.likes = this.tutorial.likes.length;
    });
  }

  getLiked() {
    if (this.tutorial.likes.includes(this.user.username)) {
      this.liked = true;
    } else {
      this.liked = false;
    }
  }

  clearNull() {
    if (this.tutorial.likes.includes(null)) {
      this.tutorial.likes = this.tutorial.likes.filter(e => e !== null);
    }
    if (this.tutorial.likes.includes("")) {
      this.tutorial.likes = this.tutorial.likes.filter(e => e !== "");
    }
  }

  like(tutorial: Tutorial) {
    if (tutorial.likes.includes(this.user.username)) {
      tutorial.likes = tutorial.likes.filter(e => e !== this.user.username);
    } else {
      if (this.user.username != "") {
        this.tutorial.likes.push(this.user.username);
      }
    }
    this.tutorialService.putTutorial(tutorial).subscribe(res => {
      this.activeRoute.params.subscribe(res => {
        this.likes = tutorial.likes.length;
        this.getTutorial(res.id);
        console.log(this.tutorial.likes);
      });
    });
    this.getLiked();
    this.clearNull();
  }
}
