import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

interface BannerData {
  Banner: string;
  Age: number;
  Address: string;
  id: number;
}
@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  bannerList = [];
  bannerdata: BannerData;
  bannerForm: FormGroup;
  max_id: any;
  
  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,) {
    this.bannerdata = {} as BannerData;
  }

  SubCategory() {
    this.navCtrl.navigateForward('/view');
  }

  ngOnInit() {

    this.bannerForm = this.fb.group({
      Banner: ['', [Validators.required]],
      ban_id: [this.max_id, [Validators.required]],
      ban_image: [],
    })

    this.fireStoreService.read_banner().subscribe(data => {

      this.bannerList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          ban_id: e.payload.doc.data()['ban_id'],
          Banner: e.payload.doc.data()['Banner'],
          ban_image: e.payload.doc.data()['ban_image'],
        };
      })
      this.get_max_id();
      // console.log(this.categoryList);
    });
  }

  CreateRecord() {
    console.log(this.bannerForm.value);
    this.get_max_id();
    this.fireStoreService.create_banner(this.bannerForm.value).then(resp => {
      this.bannerForm.reset();
      this.ngOnInit();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    alert("Delete Disabled");
    // this.fireStoreService.delete_banner(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditBanner = record.Banner;
    record.Editban_image = record.ban_image;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Banner'] = recordRow.EditBanner;
    record['ban_image'] = recordRow.Editban_image;
    this.fireStoreService.update_banner(recordRow.id, record);
    recordRow.isEdit = false;
  }

  get_max_id() {
    var maxid = Math.max.apply(Math, this.bannerList.map(function (o) { return o.ban_id; }));
    if (maxid <= 0 || maxid == NaN) {
      this.max_id = 1;
    } else {
      this.max_id = maxid + 1;
    }
    // this.max_id = maxid+1;
    console.log(this.max_id);
  }

}
