import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./../../../models/user";
import { UserService } from "./../../../services/user.service";
import { AuthService } from "./../../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { PreguntaService } from "./../../../services/pregunta.service";
import { Pregunta } from "./../../../models/pregunta";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pregunta",
  templateUrl: "./onepregunta.component.html",
  styleUrls: ["./onepregunta.component.css"]
})
export class PreguntaComponent implements OnInit {
  pregunta: Pregunta = {
    _id: "",
    desarrollo: "",
    categoria: "",
    pregunta: "",
    likes: [],
    creador: ""
  };

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

  likes: number;

  constructor(
    public preguntaService: PreguntaService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private fs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.getPreguntaData(res.id);
    });
    this.getUser();
    this.getPregunta();
  }

  getPreguntaData(_id: string) {
    this.preguntaService.getPregunta(_id).subscribe(res => {
      this.pregunta = res as Pregunta;
      console.log(this.pregunta);
    });
  }

  getPregunta() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
      this.likes = this.pregunta.likes.length;
    });
  }

  getUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.fs
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            let username = doc.get("username");
            this.user.username = username;
          });
      }
    });
  }

  like(pregunta: Pregunta) {
    this.authService.isAuth().subscribe(logged => {
      if (logged) {
        let liked;
        for (let i = 0; i < pregunta.likes.length; i++) {
          if (pregunta.likes[i] == this.user.username) {
            liked = true;
            break;
          }
        }
        if (!liked) {
          pregunta.likes.push(this.user.username);
        }
      }
    });
    this.preguntaService.putPregunta(pregunta).subscribe(res => {
      this.likes = this.pregunta.likes.length;
      this.getPregunta();
    });
  }
}
