import { Tutorial } from "./../../../models/tutorial";
import { Router } from "@angular/router";
import { TutorialService } from "./../../../services/tutorial.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tutoriales",
  templateUrl: "./tutoriales.component.html",
  styleUrls: ["./../../../app.component.css", "./tutoriales.component.css"]
})
export class TutorialesComponent implements OnInit {
  constructor(
    public tutorialService: TutorialService,
    private router: Router
  ) {}

  page = 1;//Pagina en la cual inicia
  pageSize = 10;//Cantidad de entradas que tendra la pagina
  collectionSize; //Longitud de la coleccion

  ngOnInit(): void {
    this.getTutorial();
  }

  getTutorial() {
    this.tutorialService.getTutoriales().subscribe(res => {
      this.tutorialService.tutoriales = res as Tutorial[];
      this.collectionSize = this.tutorialService.tutoriales.length; // Lo guardo aparte porque sino en el html me trae problemas
    });
  }

  verTutorial(_id: String) {
    this.router.navigate(["tutoriales/" + _id]);
  }

  darLike(tutorial: Tutorial) {
    tutorial.likes++;
    this.tutorialService.putTutorial(tutorial).subscribe(res => {
      this.getTutorial();
    });
  }
}
