import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

interface CategoryData {
  Category: string;
  Age: number;
  Address: string;
  id:number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {

  categoryList = [];
  categorydata: CategoryData;
  categoryForm: FormGroup;
  max_id: any;
  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,) 
    {
      this.categorydata = {} as CategoryData;
    }

  SubCategory(){
    this.navCtrl.navigateForward('/view');
  }

  ngOnInit() {

    this.categoryForm = this.fb.group({
      Category: ['', [Validators.required]],
      cat_id: [this.max_id,[Validators.required]],
    })
  
    this.fireStoreService.read_category().subscribe(data => {

      this.categoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          cat_id: e.payload.doc.data()['cat_id'],
          Category: e.payload.doc.data()['Category'],
        };
      })
      this.get_max_id();
      // console.log(this.categoryList);
    });
  }

  CreateRecord() {
    console.log(this.categoryForm.value);
    this.get_max_id();
    this.fireStoreService.create_category(this.categoryForm.value).then(resp => {
      this.categoryForm.reset();
      this.ngOnInit();
    })
    .catch(error => {
      console.log(error);
    });
  }

  RemoveRecord(rowID) {
    alert("Delete Disabled");
    // this.fireStoreService.delete_category(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditCategory = record.Category;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Category'] = recordRow.EditCategory;
    this.fireStoreService.update_category(recordRow.id, record);
    recordRow.isEdit = false;
  }

  get_max_id(){
    var maxid =Math.max.apply(Math, this.categoryList.map(function(o) { return o.cat_id; }));
    if(maxid<= 0 || maxid==NaN) {
      this.max_id = 1;
    } else {
      this.max_id = maxid+1;
    }
    // this.max_id = maxid+1;
    console.log(this.max_id);
  }
}
