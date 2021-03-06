import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "codecave";
  cargando: boolean = true;

  constructor() {
    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }
}
