import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.page.html',
  styleUrls: ['./adminusers.page.scss'],
})
export class AdminusersPage implements OnInit {
  Adminlist = [];
  AdminusersForm: FormGroup;
  constructor(public navCtrl: NavController, private fireStoreService: FireStoreService,
    public fb: FormBuilder,private firestore:AngularFirestore) { }

  ngOnInit() {
    this.AdminusersForm = this.fb.group({
      UId: ['',Validators.required,],
      email: ['', Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      password: ['', [Validators.required,Validators.minLength(5)]],
      location: ['', [Validators.required,Validators.minLength(3)]]
    })

    this.fireStoreService.read_admin().subscribe(data => {
      this.Adminlist = data.map(e => {
        return {
          id: e.payload.doc.id,
              UId: e.payload.doc.data()['UId'],
              email: e.payload.doc.data()['email'],
              password: e.payload.doc.data()['password'],
              location: e.payload.doc.data()['location'],
        };
      })
      // this.get_max_id();
      console.log(this.Adminlist);
    });
  }

  CreateRecord() {
    console.log(this.AdminusersForm.value);
    // this.get_max_id();
    this.fireStoreService.create_admin(this.AdminusersForm.value).then(resp => {
      this.AdminusersForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }
  RemoveRecord(rowID) {
    alert("Delete Disabled");
    // this.fireStoreService.delete_admin(rowID);
    // this.firestore.collection('Offers').doc(rowID).update({
    //   Offers_id:2
    // })
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditUId = record.UId;
    record.Editemail = record.email;
    record.Editpassword = record.password;
    record.Editlocation = record.location;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['UId'] = recordRow.EditUId;
    record['email'] = recordRow.Editemail;
    record['password'] = recordRow.Editpassword;
    record['location'] = recordRow.Editlocation;
    this.fireStoreService.update_admin(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
