import { ActivatedRoute } from "@angular/router";
import { TutorialService } from "./../../../../services/tutorial.service";
import { Tutorial } from "./../../../../models/tutorial";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tutorial",
  templateUrl: "./onetutorial.component.html",
  styleUrls: ["./onetutorial.component.css"]
})
export class TutorialComponent implements OnInit {
  tutorial: Tutorial = {
    _id: "",
    desarrollo: "",
    category: "",
    titulo: "",
    likes: [],
    owner: "",
    fecha: []
  };

  constructor(
    public tutorialService: TutorialService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.getTutorial(res.id);
    });
  }

  getTutorial(_id: string) {
    this.tutorialService.getTutorial(_id).subscribe(res => {
      this.tutorial = res as Tutorial;
      console.log(this.tutorial);
    });
  }
}
