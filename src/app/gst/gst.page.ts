import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

interface gstData {
  taxrates: string;
  products: string;
}

@Component({
  selector: 'app-gst',
  templateUrl: './gst.page.html',
  styleUrls: ['./gst.page.scss'],
})
export class GstPage implements OnInit {

  gstlist = [];
  gstdata: gstData;
  gstForm: FormGroup;
  max_id: any;

  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router)
    { 
      this.gstdata = {} as gstData;
    }

  ngOnInit() {
    
    this.gstForm = this.fb.group({
      gst_id: [, [Validators.required]],
      taxrates: ['', [Validators.required]],
      products: ['', [Validators.required]],
    })

    this.fireStoreService.read_gst().subscribe(data => {

      this.gstlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          gst_id: e.payload.doc.data()['gst_id'],
          taxrates: e.payload.doc.data()['taxrates'],
          products: e.payload.doc.data()['products'],
        };
      })
      this.get_max_id();
      console.log(this.gstlist);
    });
  }

  CreateRecord() {
    console.log(this.gstForm.value);
    this.get_max_id();
    this.fireStoreService.create_gst(this.gstForm.value).then(resp => {
      this.gstForm.reset();
      this.ngOnInit();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    alert("Delete Disabled");
    // this.fireStoreService.delete_gst(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Edittaxrates = record.taxrates;
    record.Editproducts = record.products;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['taxrates'] = recordRow.Edittaxrates;
    record['products'] = recordRow.Editproducts;
    this.fireStoreService.update_gst(recordRow.id, record);
    recordRow.isEdit = false;
  }

  get_max_id(){
    var maxid =Math.max.apply(Math, this.gstlist.map(function(o) { return o.gst_id; }));
    if(maxid<= 0 || maxid==NaN) {
      this.max_id = 1;
    } else {
      this.max_id = maxid+1;
    }
    console.log(this.max_id);
}

}
