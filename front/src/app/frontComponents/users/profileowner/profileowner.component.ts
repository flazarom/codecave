import { Tutorial } from "./../../../models/tutorial";
import { TutorialService } from "./../../../services/tutorial.service";
import { Pregunta } from "./../../../models/pregunta";
import { PreguntaService } from "./../../../services/pregunta.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { MedalService } from "./../../../services/medal.service";
import { UserService } from "./../../../services/user.service";
import { User } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profileowner",
  templateUrl: "./profileowner.component.html",
  styleUrls: ["./../../../app.component.css", "./profileowner.component.css"]
})
export class ProfileownerComponent implements OnInit {
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

  pregunta: Pregunta = {
    _id: "",
    pregunta: "",
    category: "",
    details: "",
    likes: [],
    owner: ""
  };

  tutorial: Tutorial = {
    _id: "",
    title: "",
    category: "",
    tutorial: "",
    likes: [],
    owner: ""
  };

  medals = [];
  altMedallas = [];
  noMedals;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService,
    private medalService: MedalService,
    private preguntaService: PreguntaService,
    private fs: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.loading();
    this.activeRoute.params.subscribe(res => {
      try {
        this.getPregunta(res.id);
      } catch {}
      try {
        this.getTutorial(res.id);
      } catch {}
    });
  }

  cargando: boolean = true;

  async getPregunta(_id: string) {
    await this.preguntaService.getPregunta(_id).subscribe(res => {
      this.pregunta = res as Pregunta;
      this.getUser();
    });
  }

  async getTutorial(_id: string) {
    await this.tutorialService.getTutorial(_id).subscribe(res => {
      this.tutorial = res as Tutorial;
      this.getUser();
    });
  }

  loading() {
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  getUser() {
    try {
      this.userService.getUser(this.pregunta.owner).subscribe(res => {
        this.user = res as User;
        this.medals = res.medals;
        this.setAlts();
      });
    } catch {}
    try {
      this.userService.getUser(this.tutorial.owner).subscribe(res => {
        this.user = res as User;
        this.medals = res.medals;
        this.setAlts();
      });
    } catch {}
  }

  setAlts() {
    for (let i = 0; i < this.medals.length; i++) {
      this.medalService.getMedal(this.medals[i]).subscribe(medal => {
        this.altMedallas.push(medal);
      });
    }
    if (this.medals.length == 0) {
      this.noMedals = true;
    }
  }

  getMedals() {
    return this.altMedallas;
  }

  gotoOwnerProfile() {
    this.router.navigate([this.user.username]);
  }
}
