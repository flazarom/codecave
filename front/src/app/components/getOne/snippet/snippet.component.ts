import { ActivatedRoute } from '@angular/router';
import { Snippet } from './../../../models/snippet';
import { SnippetService } from './../../../services/snippet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  snippet: Snippet = {
    _id: '',
    desarrollo: '',
    lenguaje: '',
    titulo: '',
    likes: 0,
    creador: ''
  };

  constructor(public snippetService: SnippetService,
      private activeRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activeRoute.params.subscribe(
      res => {
        this.getSnippet(res.id);
      }
    )
  }

  getSnippet(_id: string) {
    this.snippetService.getSnippet(_id).subscribe(res => {
      this.snippet = res as Snippet;
      console.log(this.snippet)
    });
  }
}
