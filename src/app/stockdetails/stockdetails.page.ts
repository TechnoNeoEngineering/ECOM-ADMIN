import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-stockdetails',
  templateUrl: './stockdetails.page.html',
  styleUrls: ['./stockdetails.page.scss'],
})
export class StockdetailsPage implements OnInit {

  public selectedCategory: any[];
  public selectedSubCategory: any[];

  public sCat: any;
  public sSubCat: any;
  c1: any;
  s1: any;
  add:string;
  categoryList = [];
  SubCategoryList = [];
  quantity:any
  filtered: any[];

  ProductviewList :any[]=[];

  constructor(public navCtrl: NavController, private fireStoreService: FireStoreService,
    public fb: FormBuilder,private firestore:AngularFirestore) { }

  ionViewWillEnter() {
    this.fireStoreService.read_category().subscribe(data => {

      this.categoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          cat_id: e.payload.doc.data()['cat_id'],
          Category: e.payload.doc.data()['Category'],
        };
      })
    });

    // ---------------Sub-Category--------------

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
    })
  }

  setCategoryValues(sCat) {
    this.selectedCategory = this.SubCategoryList.filter(Categoryvalue => Categoryvalue.cat_id == sCat);
    this.sSubCat = null;
  }

  cat_name() {
    const mergeById = (SubCategoryList, categoryList) =>
      SubCategoryList.map(itm => ({
        ...categoryList.find((item) => (item.cat_id === itm.cat_id) && item),
        ...itm
      }));
    this.filtered = mergeById(this.SubCategoryList, this.categoryList);
  }

  setSubCategoryValues(sSubCat) {
    this.selectedSubCategory = this.ProductviewList.filter(SubCategoryvalue => SubCategoryvalue.SubCategory_id == sSubCat);
    // alert(sSubCat);
  }

  ngOnInit() {
		this.fireStoreService.read_Productdetails().subscribe(data => {

			this.ProductviewList = data.map(e => {
			  return {
          id: e.payload.doc.id,
          isEdit: false,
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id'],
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          stock: e.payload.doc.data()['stock'],
				  addstock: e.payload.doc.data()['addstock'],
			  }
			});
		});
  }
  

  addstock(row){
    console.log(row);

    if(row.stock == NaN || row.stock == '' || row.stock == undefined) {
       this.quantity = 0 + parseInt(this.add);
       this.firestore.collection('viewProducts_Table').doc(row.id).update({
        stock:this.quantity
      })
    }
    else
    {
      let quantity = parseInt(row.stock) + parseInt(this.add);
      this.firestore.collection('viewProducts_Table').doc(row.id).update({
      stock:quantity
      })
    }
  }
}