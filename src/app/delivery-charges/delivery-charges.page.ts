import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

interface deliveryData {
  Delivery_id: number;
  maduraicity: string;
  tamilnadu: string;
  kerala: string;
  karnataka: string;
  andhra: string;
  telangana: string;
  north: string;
  andaman: string;
}

@Component({
  selector: 'app-delivery-charges',
  templateUrl: './delivery-charges.page.html',
  styleUrls: ['./delivery-charges.page.scss'],
})
export class DeliveryChargesPage implements OnInit {

  deliverylist = [];
  deliverydata: deliveryData;
  deliveryForm: FormGroup;
  max_id: any;

  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,)
    { 
       this.deliverydata = {} as deliveryData;
    }

  ngOnInit() {
    this.deliveryForm = this.fb.group({
      Delivery_id: [, [Validators.required]],
      maduraicity: ['', [Validators.required]],
      tamilnadu: ['', [Validators.required]],
      kerala: ['', [Validators.required]],
      karnataka: ['', [Validators.required]],
      andhra: ['', [Validators.required]],
      telangana: ['', [Validators.required]],
      north:['', [Validators.required]],
      andaman: ['', [Validators.required]],
    })

    this.fireStoreService.read_Delivery().subscribe(data => {

      this.deliverylist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Delivery_id: e.payload.doc.data()['Delivery_id'],
          maduraicity: e.payload.doc.data()['maduraicity'],
          tamilnadu: e.payload.doc.data()['tamilnadu'],
          kerala: e.payload.doc.data()['kerala'],
          karnataka: e.payload.doc.data()['karnataka'],
          andhra: e.payload.doc.data()['andhra'],
          telangana: e.payload.doc.data()['telangana'],
          north: e.payload.doc.data()['north'],
          andaman: e.payload.doc.data()['andaman']
        };
      })
      this.get_max_id();
      // console.log(this.categoryList);
    });
  }

  CreateRecord() {
    console.log(this.deliveryForm.value);
    this.get_max_id();
    this.fireStoreService.create_Delivery(this.deliveryForm.value).then(resp => {
      this.deliveryForm.reset();
      this.ngOnInit();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    alert("Delete Disabled");
    // this.fireStoreService.delete_Delivery(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Editmaduraicity = record.maduraicity;
    record.Edittamilnadu = record.tamilnadu;
    record.Editkerala = record.kerala;
    record.Editkarnataka = record.karnataka;
    record.Editandhra = record.andhra;
    record.Edittelangana = record.telangana;
    record.Editnorth = record.north;
    record.Editandaman = record.andaman;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['maduraicity'] = recordRow.Editmaduraicity;
    record['tamilnadu'] = recordRow.Edittamilnadu;
    record['kerala'] = recordRow.Editkerala;
    record['karnataka'] = recordRow.Editkarnataka;
    record['andhra'] = recordRow.Editandhra;
    record['telangana'] = recordRow.Edittelangana;
    record['north'] = recordRow.Editnorth;
    record['andaman'] = recordRow.Editandaman;
    this.fireStoreService.update_Delivery(recordRow.id, record);
    recordRow.isEdit = false;
  }

  get_max_id(){
    var maxid =Math.max.apply(Math, this.deliverylist.map(function(o) { return o.Delivery_id; }));
    if(maxid<= 0 || isNaN(maxid)) {
      this.max_id = 1;
    } else {
      this.max_id = maxid+1;
    }
    console.log(this.max_id);
}

}
