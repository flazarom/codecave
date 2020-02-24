import { Pregunta } from './../../../models/pregunta';
import { NgForm } from '@angular/forms';
import { PreguntaService } from './../../../services/pregunta.service';
import { Component, OnInit } from '@angular/core';

declare var M: any;

@Component({
  selector: "app-preguntas",
  templateUrl: "./preguntas.component.html",
  styleUrls: ["./preguntas.component.css"],
  providers: [PreguntaService]
})
export class PreguntasComponent implements OnInit {
  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.getPreguntas();
  }

  addPregunta(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.preguntaService.putPregunta(form.value).subscribe(res => {
        this.resetForm(form);
        this.getPreguntas();
        M.toast({ html: "Updated Successfully" });
      });
    } else {
      this.preguntaService.postPregunta(form.value).subscribe(res => {
        this.getPreguntas();
        this.resetForm(form);
        M.toast({ html: "Save successfully" });
      });
    }
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
      this.preguntaService.preguntas = res as Pregunta[];
    });
  }

  editPregunta(pregunta: Pregunta) {
    this.preguntaService.selectedPregunta = pregunta;
  }

  deletePregunta(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.preguntaService.deletePregunta(_id).subscribe(res => {
        this.getPreguntas();
        this.resetForm(form);
        M.toast({ html: "Deleted Succesfully" });
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.preguntaService.selectedPregunta = new Pregunta();
    }
  }
}
