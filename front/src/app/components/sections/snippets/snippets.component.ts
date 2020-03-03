import { Router } from "@angular/router";
import { Snippet } from "./../../../models/snippet";
import { SnippetService } from "./../../../services/snippet.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-snippets",
  templateUrl: "./snippets.component.html",
  styleUrls: ["./../../../app.component.css", "./snippets.component.css"]
})
export class SnippetsComponent implements OnInit {
  constructor(public snippetService: SnippetService, private router: Router) {}

  ngOnInit(): void {
    this.getSnippets();
  }

  getSnippets() {
    this.snippetService.getSnippets().subscribe(res => {
      this.snippetService.snippets = res as Snippet[];
    });
  }

  verSnippet(_id: String) {
    this.router.navigate(["snippets/" + _id]);
  }

  darLike(snippet: Snippet) {
    snippet.likes++;
    this.snippetService.putSnippet(snippet).subscribe(res => {
      this.getSnippets();
    });
  }
}
