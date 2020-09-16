import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ViewproductPage } from '../viewproduct/viewproduct.page';
// import { MenuController } from '@ionic/angular';

interface ProductData {

    Url: string;
		Urlimage_view1: string;
		Urlimage_view2: string;
		Urlimage_view3: string;
    Id: number;
    SubCategory_id:number;
    Enabled: boolean;
    Deleted: boolean;
		Product_name: string;
		Product_id: string;
		sku: string;
		Star: string;
    Review: string;
    Range: string;
    Normal_price: string;
    Price1: number;
    Price2: number;
    Price3: number;
    Price4: number;
    Price5: number;
    Price6: number;
    Price7: number;
    Price8: number;
    Price9: number;
    Price10: number;
		Offer: string;
		gst: string;
		Mrp: string;
		Emi: string;
		Key_Features1: string;
		Key_Features2: string;
		Key_Features3: string;
		Key_Features4: string;
		Key_Features5: string;
		Key_Features6: string;
		Cashback1: string;
		Cashback2: string;
		Itemdetail_name: string;
		Category_name: string;
		Category1: string;
		Category2: string;
		Category3: string;
		item_usage: string;
		pack_size: string;
		unit: string;
		Description_name: string;
		Description: string;
		Review_name: string;
    Review_des: string;
    Brand: string;
    Make: string;
    Model: string;
    YearOfManufacture: number;
    Expiry: number;
    AgeGroup: string;
    Weight: string;
    Dimensions: string;
    Color: string;
    composition: string;
    howtouse: string;
    application: string;
    packagecontents: string;
}

interface CategoryData {
  Category: string;
  SubCategory : string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public selectedCategory: any[];
  public selectedSubCategory: any[];
  
  public sCat: any;
  public sSubCat: any;
  c1:any;
  s1:any;

  productData: ProductData;
  productForm: FormGroup;
  ProductviewList :any[];
  filtered: any[];
  categoryList = [];
  categoryForm: FormGroup;

  SubCategoryList = [];
  SubCategoryform: FormGroup;
  prdt_id:any;
  max_id:any;
  Productdata={ "Id": "", "isEdit": false, "SubCategory_id": "", "Enabled": true,
  "Category_name": "", "Product_name": "","Range": "","Normal_price": "",
  "Price1":'', "Price2": "", "Price3": "", "Price4": "",
  "Price5": "", "Price6": "", "Price7": "", "Price8": "", "Price9": "", "Price10": "", "Product_id": "", 
  "Offer": "", "unit": "", "pack_size": "", "sku": "", "Star": "", "Review": "",
  "Itemdetail_name": "", "gst": "", "Mrp": "", "Emi": "", "Key_Features1": "",
  "Key_Features2": "", "Key_Features3": "", "Key_Features4": "", "Key_Features5": "", 
  "Key_Features6": "", "Cashback1": "", "Cashback2": "",  "Category1": "", "Category2": "", 
  "Category3": "", "item_usage": "", "Description_name": "", "Description": "",
  "Review_name": "", "Review_des": "", "Model": "", "YearOfManufacture": "", "Expiry": "", 
  "AgeGroup": "", "Weight": "", "Dimensions": "", "Color": "" , "Brand": "", "Make": "",
  "Url": "", "Urlimage_view1": "", "Urlimage_view2": "", "Urlimage_view3": "",
   "composition": "", "howtouse": "", "application": "", "packagecontents": ""
  }
  // Productdata:any[];
  newdata:any;
  updateid:any="save";
  constructor(public navCtrl: NavController, private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    private router: Router,public navParams: NavParams,private route: ActivatedRoute
    ) { 
      this.route.queryParams.subscribe((params) => {
        if(params['Productdata']!=null){
          this.updateid = params['Updateid'];
          this.newdata = params['Productdata'];
          this.Productdata = JSON.parse(this.newdata);
          console.log(params);
        }
      });
    }

  ngOnInit() {
    this.productForm = this.fb.group({
      Id: ['', [Validators.required]],
      SubCategory_id: ['', [Validators.required]],
      Enabled: ['', [Validators.required]],
      Deleted: [false, [Validators.required]],
      Product_name: ['', [Validators.required]],
      Product_id: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      Star: ['', [Validators.required]],
      Review: ['', [Validators.required]],
      Range: ['', [Validators.required]],
      Normal_price: ['', [Validators.required]],
      Price1: ['', [Validators.required]],
      Price2: ['', [Validators.required]],
      Price3: ['', [Validators.required]],
      Price4: ['', [Validators.required]],
      Price5: ['', [Validators.required]],
      Price6: ['', [Validators.required]],
      Price7: ['', [Validators.required]],
      Price8: ['', [Validators.required]],
      Price9: ['', [Validators.required]],
      Price10: ['', [Validators.required]],
      Offer: ['', [Validators.required]],
      gst: ['', [Validators.required]],
      Mrp: ['', [Validators.required]],
      Emi: ['', [Validators.required]],
      Key_Features1: ['', [Validators.required]],
      Key_Features2: ['', [Validators.required]],
      Key_Features3: ['', [Validators.required]],
      Key_Features4: ['', [Validators.required]],
      Key_Features5: ['', [Validators.required]],
      Key_Features6: ['', [Validators.required]],
      Cashback1: ['', [Validators.required]],
      Cashback2: ['', [Validators.required]],
      Itemdetail_name: ['', [Validators.required]],
      Category_name: ['', [Validators.required]],
      Category1: ['', [Validators.required]],
      Category2: ['', [Validators.required]],
      Category3: ['', [Validators.required]],
      item_usage: ['', [Validators.required]],
      pack_size: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      Description_name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Review_name: ['', [Validators.required]],
      Review_des: ['', [Validators.required]],
      Brand: ['', [Validators.required]],
      Make: ['', [Validators.required]],
      Model: ['', [Validators.required]],
      YearOfManufacture: ['', [Validators.required]],
      Expiry: ['', [Validators.required]],
      AgeGroup: ['', [Validators.required]],
      Weight: ['', [Validators.required]],
      Dimensions: ['', [Validators.required]],
      Url: ['', [Validators.required]],
      Urlimage_view1: ['', [Validators.required]],
      Urlimage_view2: ['', [Validators.required]],
      Urlimage_view3: ['', [Validators.required]],
      Color: ['', [Validators.required]],
      composition: ['', [Validators.required]],
      howtouse: ['', [Validators.required]],
      application: ['', [Validators.required]],
      packagecontents: ['', [Validators.required]]
    });
    this.fireStoreService.read_Productdetails().subscribe(data => {

			this.ProductviewList = data.map(e => {
			  return {
        id: e.payload.doc.id,
        Product_id: e.payload.doc.data()['Product_id'],
        Deleted: e.payload.doc.data()['Deleted'],
        };
      })
      this.get_max_id();
    });

  }
  
  ionViewWillEnter(){
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
      this.cat_name;
      // console.log(this.Productdata['SubCategory_id']);
      if(this.Productdata['SubCategory_id']!=""){
      var scat_index = -1; 
      var scat_val = this.Productdata['SubCategory_id'];
      // console.log(this.SubCategoryList);
      var scatObj = this.SubCategoryList.find(function(item, i){
        if(item.SubCategory_id === scat_val){
          scat_index = i;
        return i;
        }
      });
      this.c1= scatObj['cat_id'];
      // console.log(scat_index, scatObj['cat_id']);
      this.setCategoryValues(this.c1);
      var subcatindex = -1;
      // var subcat_val = this.Productdata['SubCategory_id'];
      // console.log(scat_val);
      // console.log(this.selectedCategory[0]);
      var subcatObj = this.selectedCategory.find(function(item, i){
        if(item.SubCategory_id === scat_val){
          subcatindex = i;
        return i; 
        }
      });
      this.s1=this.selectedCategory[subcatindex].SubCategory_id;
      // console.log(this.s1);
      // console.log(subcatindex, subcatObj);
      // var cat_index = -1;
      // var cat_val = subcatObj['cat_id'];
      // console.log(cat_val);
      // var catObj = this.categoryList.find(function(item, i){
      //   if(item.cat_id === cat_val){
      //     cat_index = i;
      //   return i;
      //   }
      // });
      // console.log(cat_index, catObj);
      // this.c1= this.categoryList[cat_index].cat_id;
      // console.log(this.c1);
    }
    })    
  }

  setCategoryValues(sCat) {
    this.selectedCategory = this.SubCategoryList.filter(Categoryvalue => Categoryvalue.cat_id == sCat);
    this.sSubCat = null;
    console.log(sCat);
  }

  cat_name(){
  const mergeById = (SubCategoryList, categoryList) =>
  SubCategoryList.map(itm => ({
    ...categoryList.find((item) => (item.cat_id === itm.cat_id) && item),
    ...itm
  }));
  this.filtered= mergeById(this.SubCategoryList, this.categoryList);
  // console.log(this.filtered);
  }

  UpdateRecord(recordRow) {
    let record = {};
    // record['Expiry'] = year_of_mfg;
    this.fireStoreService.update_Productdetails(recordRow.id, this.productForm.value);
    // recordRow.isEdit = false;
  }

  CreateProductDetails(){
    // window.location.reload();
    if(this.updateid=="save"){
      this.fireStoreService.create_Productdetails(this.productForm.value).then(resp => { 
        this.get_max_id();
        this.productForm['Product_id']=  this.max_id;
        // this.prdt_id= this.max_id;
        console.log(this.prdt_id);
        console.log(this.productForm.value);
        this.productForm.reset(); 
      })
        .catch(error => {
          console.log(error);
        }); 
    }   
    else if(this.updateid=="update"){
      this.UpdateRecord(this.Productdata);
      this.prdt_id= this.Productdata.Product_id;
      this.productForm.reset();
      this.navCtrl.navigateForward("/admin");
      // console.log(this.prdt_id);
      // console.log(this.productForm.value);
    } 
  }
  cancel(){
    this.productForm.reset();
    this.navCtrl.navigateForward("/admin");
    this.updateid="save";
  }

  get_max_id(){
    var maxid =Math.max.apply(Math, this.ProductviewList.map(function(o) { return o.Product_id; }));
    this.max_id = maxid+1;
    console.log(this.max_id);
  }
}
