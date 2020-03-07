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
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading();
    this.activeRoute.params.subscribe(res => {
      this.getPregunta(res.id);
      console.log(this.pregunta, " 1");
    });
  }

  cargando: boolean = true;

  async getPregunta(_id: string) {
    await this.preguntaService.getPregunta(_id).subscribe(res => {
      this.pregunta = res as Pregunta;
      console.log(this.pregunta, " 2");
      this.getUser();
    });
  }

  loading() {
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  getUser() {
    this.userService.getUser(this.pregunta.owner).subscribe(res => {
      this.user = res as User;
      this.medals = res.medals;
      this.setAlts();
    });
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
    this.router.navigate(["users/", this.user.username]);
  }
}
