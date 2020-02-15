import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

  oTutoriales = false;
  oPreguntas = false;
  oSnippets = false;
  oSections = 0;
  empty = true;

  checkSections(){
    if (this.oTutoriales == false && this.oPreguntas == false && this.oSnippets == false) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  hideSections() {
    this.oTutoriales = false;
    this.oPreguntas = false;
    this.oSnippets = false;
  }

  mostrarTutoriales() {
    if(this.oTutoriales == false) {
      this.hideSections();
      this.oTutoriales = true;
    } else {      
      this.hideSections();
    }
    this.checkSections();
  }
  mostrarPreguntas() {
    if(this.oPreguntas == false) {
      this.hideSections();
      this.oPreguntas = true;
    } else {      
      this.hideSections();
    }
    this.checkSections();
  }
  mostrarSnippets() {
    if(this.oSnippets == false) {
      this.hideSections();
      this.oSnippets = true;
    } else {      
      this.hideSections();
    }
    this.checkSections();
  }
  
}
