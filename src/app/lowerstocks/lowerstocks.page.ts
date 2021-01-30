import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lowerstocks',
  templateUrl: './lowerstocks.page.html',
  styleUrls: ['./lowerstocks.page.scss'],
})
export class LowerstocksPage implements OnInit {

  
  ProductviewList :any[]=[];
  quantity:any;
  add = [];
  lower: any;

  constructor(public navCtrl: NavController, private fireStoreService: FireStoreService,
    public fb: FormBuilder,private firestore:AngularFirestore,
    private AlertController: AlertController) { }

  ngOnInit() {

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

      console.log(this.ProductviewList);

      this.lower = this.ProductviewList.filter(lower => lower.stock < 10);
      console.log(this.lower);
    });

   
  }

  addstock(row, i){
    // alert(this.add[i]);
    console.log(row);
    if(isNaN(row.stock) || row.stock == '' ) {
       this.quantity = 0 + parseInt(this.add[i]);
       this.firestore.collection('viewProducts_Table').doc(row.id).update({
        stock:this.quantity
      });

    }
    else
    {
      let quantity = parseInt(row.stock) + parseInt(this.add[i]);
      this.firestore.collection('viewProducts_Table').doc(row.id).update({
      stock:quantity
      });
      
    }
    this.add[i]='';
    this.ngOnInit();
  }

  
}
