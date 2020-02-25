import { ActivatedRoute } from '@angular/router';
import { TutorialService } from './../../../services/tutorial.service';
import { Tutorial } from './../../../models/tutorial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  tutorial: Tutorial = {
    _id: '',
    contenido: '',
    categoria: '',
    title: '',
    likes: 0,
    creador: ''
  };

  constructor(public tutorialService: TutorialService,
      private activeRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activeRoute.params.subscribe(
      res => {
        this.getTutorial(res.id);
      }
    )
  }

  getTutorial(_id: string) {
    this.tutorialService.getTutorial(_id).subscribe(res => {
      this.tutorial = res as Tutorial;
      console.log(this.tutorial)
    });
  }

}
