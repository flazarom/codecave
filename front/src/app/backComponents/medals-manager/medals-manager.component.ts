import { Component, OnInit } from "@angular/core";
import { Medal } from "./../../models/medal";
import { MedalService } from "./../../services/medal.service";

@Component({
  selector: "app-medals-manager",
  templateUrl: "./medals-manager.component.html",
  styleUrls: ["./medals-manager.component.css"]
})
export class MedalsManagerComponent implements OnInit {
  constructor(private medalService: MedalService) {}

  public medals: Medal[];
  public medal: Medal = {
    _id: null,
    medalid: "",
    medalname: "",
    medaldesc: ""
  };

  ngOnInit(): void {
    this.getAllMedals();
  }

  getAllMedals() {
    this.medalService.getMedals().subscribe(res => {
      this.medals = res as Medal[];
    });
  }

  delete(medal: Medal) {
    const opcion = confirm("¿Desea eliminar esta medalla?");
    if (opcion === true) {
      this.medalService.deleteMedal(medal._id).subscribe(res => {
        const indexMedal = this.medals.indexOf(medal);
        this.medals.splice(indexMedal, 1);
        alert("La medalla fue eliminada con éxito");
      });
    }
  }
}
