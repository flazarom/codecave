import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./../../app.component.css", "./portal.component.css"]
})
export class PortalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  oTutoriales = false;
  oPreguntas = false;
  oSections = 0;
  empty = true;

  checkSections() {
    if (this.oTutoriales == false && this.oPreguntas == false) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  hideSections() {
    this.oTutoriales = false;
    this.oPreguntas = false;
  }

  mostrarTutoriales() {
    if (this.oTutoriales == false) {
      this.hideSections();
      this.oTutoriales = true;
    } else {
      this.hideSections();
    }
    this.checkSections();
  }
  mostrarPreguntas() {
    if (this.oPreguntas == false) {
      this.hideSections();
      this.oPreguntas = true;
    } else {
      this.hideSections();
    }
    this.checkSections();
  }
}
