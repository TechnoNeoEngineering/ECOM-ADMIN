import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-specialuserrequest',
  templateUrl: './specialuserrequest.page.html',
  styleUrls: ['./specialuserrequest.page.scss'],
})
export class SpecialuserrequestPage implements OnInit {

  RequestForm: any[];

  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    ) { }

  ngOnInit() {

    this.fireStoreService.read_specialrequest().subscribe(data => {

      this.RequestForm = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Mobile: e.payload.doc.data()['mobile'],
          Address: e.payload.doc.data()['address'],
          Products: e.payload.doc.data()['products'],
          Date: e.payload.doc.data()['date']
        };
      })
      console.log(this.RequestForm);
    });
  }

}
