import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreservicesService {
  
  collectionSpecialuserrequest = 'Specialuserrequest';
  collectionsuperToken = 'superadminToken';
  collectionlayerconfirmpassword = 'layerconfirmpassword';
  collectionlayerconfirmquestions = 'layerconfirmquestions';
  collectionlayerToken = "layertoken";
  constructor(private firestore: AngularFirestore) { }
  get windowRef(){
    return window;
}
  create_specialrequest(record) {
    return this.firestore.collection(this.collectionSpecialuserrequest).add(record);
  }
  
  read_specialrequest() {
    return this.firestore.collection(this.collectionSpecialuserrequest).snapshotChanges();
  }
  
  update_specialrequest(recordID, record) {
    this.firestore.doc(this.collectionSpecialuserrequest + '/' + recordID).update(record);
  }
  
  delete_specialrequest(record_id) {
    this.firestore.doc(this.collectionSpecialuserrequest + '/' + record_id).delete();
  }
  // =========================================reset pincode==================================
  create_layerconfirmpassword(record) {
    return this.firestore.collection(this.collectionlayerconfirmpassword).add(record);
  }
  
  read_layerconfirmpassword() {
    return this.firestore.collection(this.collectionlayerconfirmpassword).snapshotChanges();
  }
  
  update_layerconfirmpassword(recordID, record) {
    this.firestore.doc(this.collectionlayerconfirmpassword + '/' + recordID).update(record);
  }
  
  delete_layerconfirmpassword(record_id) {
    this.firestore.doc(this.collectionlayerconfirmpassword + '/' + record_id).delete();
  }
  //========================================layerresetquestions=====================================
  create_layerconfirmquestions(record) {
    return this.firestore.collection(this.collectionlayerconfirmquestions).add(record);
  }
  
  read_layerconfirmquestions() {
    return this.firestore.collection(this.collectionlayerconfirmquestions).snapshotChanges();
  }
  
  update_layerconfirmquestions(recordID, record) {
    this.firestore.doc(this.collectionlayerconfirmquestions + '/' + recordID).update(record);
  }
  
  delete_layerconfirmquestions(record_id) {
    this.firestore.doc(this.collectionlayerconfirmquestions + '/' + record_id).delete();
  }
  create_layerToken(record) {
    return this.firestore.collection(this.collectionlayerToken).add(record);
  }

  read_layerToken() {
    return this.firestore.collection(this.collectionlayerToken).snapshotChanges();
  }

  update_layerToken(recordID, record) {
    this.firestore.doc(this.collectionlayerToken + '/' + recordID).update(record);
  }

  delete_layerToken(record_id) {
    this.firestore.doc(this.collectionlayerToken + '/' + record_id).delete();
  }

create_superadmintoken(record) {
    return this.firestore.collection(this.collectionsuperToken).add(record);
  }

  read_superadmintoken() {
    return this.firestore.collection(this.collectionsuperToken).snapshotChanges();
  }

  update_superadmintoken(recordID, record) {
    this.firestore.doc(this.collectionsuperToken + '/' + recordID).update(record);
  }

  delete_superadmintoken(record_id) {
    this.firestore.doc(this.collectionsuperToken + '/' + record_id).delete();
  }
}
