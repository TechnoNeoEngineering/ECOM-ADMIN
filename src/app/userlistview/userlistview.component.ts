import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-userlistview',
  templateUrl: './userlistview.component.html',
  styleUrls: ['./userlistview.component.scss'],
})
export class UserlistviewComponent {
  @Input() user_id: string;

  SubCategoryList: any[];
  ProductviewList: any[];
  ProductList: any[];

  selectedProducts: any[] = [];
  cart_list: any[] = [];
  listarray = [];
  checkedval: boolean = false;
  subCategorylen:any;
  constructor(private modalCtrl: ModalController,
    private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    private router: Router, public navParams: NavParams, private route: ActivatedRoute) {

  }
  init = false;
  ionViewWillEnter() {

    this.init = false;
    this.cart_list = this.navParams.get('user_id');
    this.listarray = this.cart_list['list'];
    console.log(this.cart_list);
    if (this.listarray != null) {
      this.selectedProducts = this.listarray;
    }
    else {
      this.selectedProducts = [];
    }
    // this.listarray = selected;

    this.fireStoreService.read_subcategory().subscribe(data => {

      this.SubCategoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          cat_id: e.payload.doc.data()['cat_id'],
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          SubCategory: e.payload.doc.data()['SubCategory'],
        };
      })
      this.subCategorylen = this.SubCategoryList.length;
      this.init = true;
    })

    this.fireStoreService.read_Productdetails().subscribe(data => {

      this.ProductviewList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id']
        };
      });
    });
  }

  sSub: any;
  dismissModel() {
    this.modalCtrl.dismiss();
  }
  setSubCategoryValues() {

    this.ProductList = this.ProductviewList.filter(SubCatvalue => SubCatvalue.SubCategory_id === this.sSub.SubCategory_id);
    this.first = 0;
    this.drawn = false;
    console.log(this.ProductList);
  }
  verifyEvent(Product) {

    // this.selectedProducts=[];
    if (this.selectedProducts.includes(Product.Product_id)) {
      var index = this.selectedProducts.indexOf(Product.Product_id);
      // console.log(index);
      this.selectedProducts.splice(index, 1);
      console.log(this.selectedProducts);
    }
    else {
      this.selectedProducts.push(Product.Product_id);
      console.log(this.selectedProducts);
      // console.log("added into array");
    }
  }
  // savedata(){
  //   console.log(this.selectedProducts);
  // }
  savedata() {
    let record = {};
    record['list'] = this.selectedProducts;
    console.log(this.cart_list['id']);
    this.fireStoreService.update_userspecial(this.cart_list['id'], record);
    this.modalCtrl.dismiss();
  }
  // k=0;
  first = -1;
  drawn = false;
  isFound(Product_id) {
    if (!this.drawn) {
      console.log(Product_id);
    }
    this.first++;
    // alert(Product_id);
    // this.k++;
    const context = this;
    setTimeout(() => {
      context.first = 0;
      context.drawn = true;
    }
      , 200);

    if (this.listarray.includes(Product_id)) {

      return true;
    }
    else {
      return false;
    }
  }
}
