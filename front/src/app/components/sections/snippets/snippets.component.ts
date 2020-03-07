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
  cargando: boolean = true;
  constructor(public snippetService: SnippetService, private router: Router) {}

  page = 1; //Pagina en la cual inicia
  pageSize = 10; //Cantidad de entradas que tendra la pagina
  collectionSize; //Longitud de la coleccion

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    this.snippetService.getSnippets().subscribe(res => {
      this.snippetService.snippets = res as Snippet[];
      this.collectionSize = this.snippetService.snippets.length; // Lo guardo aparte porque sino en el html me trae problemas
    });
  }

  verSnippet(_id: String) {
    this.router.navigate(["snippets/" + _id]);
  }
}
