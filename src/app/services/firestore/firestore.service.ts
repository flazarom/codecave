import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}
  // Crea un nuevo usuario
  public createUser(data: {
    displayName: string;
    photoUrl: string;
    uid: string;
  }) {
    return this.firestore
      .collection("regUsers")
      .doc(data.uid)
      .set(data);
  }

  // Obtiene un usuario
  public getUser(documentId: string) {
    return this.firestore
      .collection("regUsers")
      .doc(documentId)
      .snapshotChanges();
  }

  // Obtiene todos los usuarios
  public getUsers() {
    return this.firestore.collection("regUsers").snapshotChanges();
  }

  // Actualiza un usuario
  public updateUser(documentId: string, data: any) {
    return this.firestore
      .collection("regUsers")
      .doc(documentId)
      .set(data);
  }
}
