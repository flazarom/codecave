import { Snippet } from './../../../models/snippet';
import { SnippetService } from './../../../services/snippet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./../../../app.component.css','./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  constructor(protected snippetService: SnippetService) { }

  ngOnInit(): void {
    this.getPreguntas();
  }

  getPreguntas() {
    this.snippetService.getSnippets().subscribe(res => {
      this.snippetService.snippets = res as Snippet[];
    });
  }

}
