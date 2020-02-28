export class Medals {
  constructor(
    dev = "Codecavedev - Desarrolló Codecave",
    python1 = "Iniciado en Python - Contestó 5 preguntas de Python",
    java1 = "Iniciado en Java - Contestó 5 preguntas de Java"
  ) {
    this.dev = dev;
    this.python1 = python1;
    this.java1 = java1;
  }
  dev: string;
  python1: string;
  java1: string;
}
