import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { MedalService } from "./../../../services/medal.service";
import { UserService } from "./../../../services/user.service";
import { User } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";

@Component({
  selector: "app-liteprofile",
  templateUrl: "./liteprofile.component.html",
  styleUrls: ["./../../../app.component.css", "./liteprofile.component.css"]
})
export class LiteprofileComponent implements OnInit {
  user: User = {
    _id: "",
    username: "",
    email: "",
    photoUrl: "",
    bio: "",
    web: "",
    github: "",
    gitlab: "",
    bitbucket: "",
    medallas: []
  };

  medallas = [];
  altMedallas = [];
  noMedals;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private userService: UserService,
    private medalService: MedalService,
    private fs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading();
    this.getCurrentUser();
    this.authService.isAuth().subscribe(user => {
      this.fs
        .collection("regUsers")
        .doc(user.uid)
        .ref.get()
        .then(doc => {
          this.getUser(doc.get("username"));
        });
    });
  }

  cargando: boolean = true;

  loading() {
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  getUser(username: string) {
    this.userService.getUser(username).subscribe(res => {
      this.user = res as User;
      // console.log(this.user);
      // var imgSrc = new Image();
      // imgSrc.src = this.user.photoUrl;
      // if (imgSrc.height != 0) {
      //   console.log("ee");
      // } else {
      //   this.user.photoUrl =
      //     "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      // }
      this.medallas = res.medallas;
      this.setAlts();
    });
  }

  setAlts() {
    for (let i = 0; i < this.medallas.length; i++) {
      this.medalService.getMedal(this.medallas[i]).subscribe(medal => {
        this.altMedallas.push(medal);
      });
    }
    if (this.medallas.length == 0) {
      this.noMedals = true;
    }
  }

  getMedals() {
    return this.altMedallas;
  }

  isLogged = false;

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log("user logged");
        this.isLogged = true;
      }
    });
  }

  loginGoogle() {
    // abre un popup de inicio ce sesión con google usando firebase
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        console.log("user logged");
        // cuando se loguea comprobamos si es la primera vez
        this.firstTime();
      })
      .catch(err => console.log("err", err.message));
  }

  firstTime() {
    // se llama al AuthService para obtener los datos del usuario
    this.authService.isAuth().subscribe(user => {
      if (user) {
        // comprueba si en la colección de firebase ya existe el ID del usuario
        this.fs
          .collection("regUsers")
          .doc(user.uid)
          .ref.get()
          .then(doc => {
            try {
              if (doc.exists) {
                // obtenemos el nombre de usuario y lo usamos para enviarlo a
                // la ruta de su perfil
                this.getCurrentUser();
                window.location.reload();
              } else {
                // si no existe en la coleccion de firebase, es xq aun no se registra,
                // asi que le ponemos el formulario
                this.router.navigate(["login"]);
              }
            } catch {
              this.router.navigate(["login"]);
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      }
    });
  }
}
