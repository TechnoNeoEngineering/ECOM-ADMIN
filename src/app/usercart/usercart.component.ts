import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.scss'],
})
export class UsercartComponent implements OnInit {
  @Input() user_id: string;

  SubCategoryList: any[];
  ProductviewList: any[];
  ProductList: any[];
  selectedProducts: any[]=[];
  cart_list:any[]=[];
  listarray=[];
  adminarr:any[];
  checkedval:boolean = false;
  constructor(private modalCtrl: ModalController,
    private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    private router: Router,public navParams: NavParams,private route: ActivatedRoute) { 
     this.cart_list = navParams.get('user_id');
     this.listarray=this.cart_list['list'];
     console.log(this.listarray);
     if(this.listarray!=null){
      this.selectedProducts = this.listarray;
     }
     else{
      this.selectedProducts = [];
     }
    } 
     
  ngOnInit() {
    // this.listarray = selected;
    this.fireStoreService.read_Productdetails().subscribe(data => {
			this.ProductviewList = data.map(e => {
        if(this.listarray.includes(e.payload.doc.data()['Product_id'])){
			  return {
				id: e.payload.doc.id,
        isEdit: false,
        SubCategory_id: e.payload.doc.data()['SubCategory_id'],
				Product_name: e.payload.doc.data()['Product_name'],
        Product_id: e.payload.doc.data()['Product_id']
      };
     }
    })
    // this.newarray();
    this.adminarr=this.ProductviewList.filter(function(item){
      return item != undefined;         
    });
    console.log(this.adminarr);
    // this.first=0;
  })
  }

  dismissModel() {
    this.modalCtrl.dismiss();
  }

  verifyEvent(Product){
    // this.selectedProducts=[];
    if(this.selectedProducts.includes(Product.Product_id)){
      var index = this.selectedProducts.indexOf(Product.Product_id);
      // console.log(index);
      this.selectedProducts.splice(index,1);
      console.log(this.selectedProducts);
    }
    else{
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
    this.fireStoreService.update_userspecial(this.cart_list['id'], record);
    this.modalCtrl.dismiss();
  }

  // isFound(Product){
  //   var isPresent = this.listarray.some(function(el){ return el === Product.Product_id});
  //   return isPresent;
  // }
}

