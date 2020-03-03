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

  ngOnInit(): void {
    this.getTutorial();
  }

  getTutorial() {
    this.tutorialService.getTutoriales().subscribe(res => {
      this.tutorialService.tutoriales = res as Tutorial[];
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
