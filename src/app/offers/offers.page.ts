import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';

interface OfferData {
  Offers_id: number;
  cat_id: string;
  subcat_id : string;
  prdt_id: string;
  prdt_name : string;
  offer_name: string;
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public selectedCategory: any[];
  public selectedSubCategory: any[];
  public selectproduct: any[];

  public sCat: string = '';
  public sSubCat: any='';
  public pdtid: any='';
  public pdtiname: any='';
  c1: any;
  s1: any;
  categoryList = [];
  SubCategoryList = [];
  ProductviewList :any[]=[];

  // offers

  Offerlist = [];
  OffersForm: FormGroup;
  offerdata: OfferData;
  max_id: any;

  constructor(public navCtrl: NavController, private fireStoreService: FireStoreService,
    public fb: FormBuilder,private firestore:AngularFirestore,) 
    { 
      this.offerdata = {} as OfferData;
    }

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

  ngOnInit() {

    this.OffersForm = this.fb.group({
      Offers_id: ['',[Validators.required]],
      cat_id: ['', [Validators.required]],
      subcat_id: ['', [Validators.required]],
      prdt_id: ['', [Validators.required]],
      prdt_name: ['', [Validators.required]],
      offer_name: ['', [Validators.required]],
      offer_image: []
    })

    this.fireStoreService.read_offers().subscribe(data => {
      this.Offerlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Offers_id: e.payload.doc.data()['Offers_id'],
          cat_id: e.payload.doc.data()['cat_id'],
          subcat_id: e.payload.doc.data()['subcat_id'],
          prdt_id: e.payload.doc.data()['prdt_id'],
          prdt_name: e.payload.doc.data()['prdt_name'],
          offer_name: e.payload.doc.data()['offer_name'],
          offer_image: e.payload.doc.data()['offer_image'],
        };
      })
      this.get_max_id();
      console.log(this.Offerlist);
    });

    // --------------- Productviewlist --------------

    this.fireStoreService.read_Productdetails().subscribe(data => {

			this.ProductviewList = data.map(e => {
			  return {
          id: e.payload.doc.id,
          isEdit: false,
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id'],
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          Category_name: e.payload.doc.data()['Category_name'],
          stock: e.payload.doc.data()['stock'],
          addstock: e.payload.doc.data()['addstock'], 
        }
      });

      // console.log(this.ProductviewList);

    });
  }

  CreateRecord() {
    console.log(this.OffersForm.value);
    this.get_max_id();
    this.fireStoreService.create_offers(this.OffersForm.value).then(resp => {
      this.OffersForm.reset();
    })                                                  
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    // alert("Delete Disabled");
    this.fireStoreService.delete_offers(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.Editcat_id = record.cat_id;
    record.Editsubcat_id = record.subcat_id;
    record.Editprdt_id = record.prdt_id;
    record.Editprdt_name = record.prdt_name;
    record.Editoffer_name = record.offer_name;
    record.Editoffer_image = record.offer_image;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['cat_id'] = recordRow.Editcat_id;
    record['subcat_id'] = recordRow.Editsubcat_id;
    record['prdt_id'] = recordRow.Editprdt_id;
    record['prdt_name'] = recordRow.Editprdt_name;
    record['offer_name'] = recordRow.Editoffer_name;
    record['offer_image'] = recordRow.Editoffer_image;
    this.fireStoreService.update_offers(recordRow.id, record);
    recordRow.isEdit = false;
  }

  setCategoryValues(sCat) {
    this.sCat = sCat;
    this.selectedCategory = this.SubCategoryList.filter(Categoryvalue => Categoryvalue.cat_id == sCat);
  }
  
  setSubCategoryValues(sSubCat) {
    this.sSubCat=sSubCat;
    this.selectedSubCategory = this.ProductviewList.filter(SubCategoryvalue => SubCategoryvalue.SubCategory_id == sSubCat);
  }

  setproductid(pdtid) {
    this.pdtid=pdtid;
    this.selectproduct = this.ProductviewList.filter(productname => productname.Product_id == pdtid);
  }

  get_max_id(){
    var maxid =Math.max.apply(Math, this.Offerlist.map(function(o) { return o.Offers_id; }));
    if(maxid<= 0 || maxid==NaN) {
      this.max_id = 1;
    } else {
      this.max_id = maxid+1;
    }
    console.log(this.max_id);
  }
}
