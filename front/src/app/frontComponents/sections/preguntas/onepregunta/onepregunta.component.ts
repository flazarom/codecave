import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./../../../../models/user";
import { UserService } from "./../../../../services/user.service";
import { AuthService } from "./../../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PreguntaService } from "./../../../../services/pregunta.service";
import { Pregunta } from "./../../../../models/pregunta";

@Component({
  selector: "app-onepregunta",
  templateUrl: "./onepregunta.component.html",
  styleUrls: ["./onepregunta.component.css"]
})
export class OnepreguntaComponent implements OnInit {
  pregunta: Pregunta = {
    _id: "",
    pregunta: "",
    category: "",
    details: "",
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
    public preguntaService: PreguntaService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fs: AngularFirestore,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.activeRoute.params.subscribe(res => {
      this.getUser();
      this.getPregunta(res.id);
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

  async getPregunta(_id: string) {
    await this.preguntaService.getPregunta(_id).subscribe(res => {
      this.pregunta = res as Pregunta;
      this.likes = this.pregunta.likes.length;
    });
  }

  getLiked() {
    if (this.pregunta.likes.includes(this.user.username)) {
      this.liked = true;
    } else {
      this.liked = false;
    }
  }

  clearNull() {
    if (this.pregunta.likes.includes(null)) {
      this.pregunta.likes = this.pregunta.likes.filter(e => e !== null);
    }
    if (this.pregunta.likes.includes("")) {
      this.pregunta.likes = this.pregunta.likes.filter(e => e !== "");
    }
  }

  like(pregunta: Pregunta) {
    if (pregunta.likes.includes(this.user.username)) {
      pregunta.likes = pregunta.likes.filter(e => e !== this.user.username);
    } else {
      if (this.user.username != "") {
        this.pregunta.likes.push(this.user.username);
      }
    }
    this.preguntaService.putPregunta(pregunta).subscribe(res => {
      this.activeRoute.params.subscribe(res => {
        this.likes = pregunta.likes.length;
        this.getPregunta(res.id);
        console.log(this.pregunta.likes);
      });
    });
    this.getLiked();
    this.clearNull();
  }
}
