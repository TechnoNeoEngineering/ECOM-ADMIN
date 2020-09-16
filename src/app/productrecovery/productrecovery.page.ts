import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FireStoreService } from '../service/fire-store.service';
import { of } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

// import data from '../../assets/icon/company.json';

interface ProductviewData {
	Categoryname: string;
	PrdouctName: string;
	Price: number;
  }

@Component({
  selector: 'app-productrecovery',
  templateUrl: './productrecovery.page.html',
  styleUrls: ['./productrecovery.page.scss'],
})
export class ProductrecoveryPage implements OnInit{

  private companies = [];
	tableStyle = 'bootstrap';
	customRowClass = false;
	data:string;

	ProductviewList :any[]=[];
	Productview: FormGroup;

  constructor(private navCtrl: NavController, private route: ActivatedRoute,
	private fireStoreService: FireStoreService,public navParams: NavParams)
	 {

		this.route.queryParams.subscribe((params) => {
			this.data = params['rowID'];
			// console.log(this.data);
		});
	 }

    switchStyle() {
      if (this.tableStyle === 'dark') {
        this.tableStyle = 'bootstrap';
      } else {
        this.tableStyle = 'dark';
      }
    }
  
    getRowClass(row) {
      
    }
  
    async open(row) {
      console.log(row);
	}
	
	adminarr:any[];

	deletefun()
	{
		this.adminarr=this.ProductviewList.filter(function(item){
			return item.Deleted == true;         
		});
		console.log(this.adminarr);

	}

  ngOnInit() {
    this.fireStoreService.read_Productdetails().subscribe(data => {

		this.ProductviewList = data.map(e => {
			return {
			  id: e.payload.doc.id,
			  isEdit: false,
			  Id: e.payload.doc.data()['Id'],
			  SubCategory_id: e.payload.doc.data()['SubCategory_id'],
			  Enabled: e.payload.doc.data()['Enabled'],
			  Deleted: e.payload.doc.data()['Deleted'],
			  Product_name: e.payload.doc.data()['Product_name'],
			  Product_id: e.payload.doc.data()['Product_id'],
			  sku: e.payload.doc.data()['sku'],
			  Star: e.payload.doc.data()['Star'],
			  Review: e.payload.doc.data()['Review'],
			  Price1: e.payload.doc.data()['Price1'],
			  Price2: e.payload.doc.data()['Price2'],
			  Price3: e.payload.doc.data()['Price3'],
			  Price4: e.payload.doc.data()['Price4'],
			  Price5: e.payload.doc.data()['Price5'],
			  Price6: e.payload.doc.data()['Price6'],
			  Price7: e.payload.doc.data()['Price7'],
			  Price8: e.payload.doc.data()['Price8'],
			  Price9: e.payload.doc.data()['Price9'],
			  Price10: e.payload.doc.data()['Price10'],
			  Offer: e.payload.doc.data()['Offer'],
			  gst: e.payload.doc.data()['gst'],
			  Mrp: e.payload.doc.data()['Mrp'],
			  Emi: e.payload.doc.data()['Emi'],
			  Key_Features1: e.payload.doc.data()['Key_Features1'],
			  Key_Features2: e.payload.doc.data()['Key_Features2'],
			  Key_Features3: e.payload.doc.data()['Key_Features3'],
			  Key_Features4: e.payload.doc.data()['Key_Features4'],
			  Key_Features5: e.payload.doc.data()['Key_Features5'],
			  Key_Features6: e.payload.doc.data()['Key_Features6'],
			  Cashback1: e.payload.doc.data()['Cashback1'],
			  Cashback2: e.payload.doc.data()['Cashback2'],
			  Itemdetail_name: e.payload.doc.data()['Itemdetail_name'],
			  Category_name: e.payload.doc.data()['Category_name'],
			  Category1: e.payload.doc.data()['Category1'],
			  Category2: e.payload.doc.data()['Category2'],
			  Category3: e.payload.doc.data()['Category3'],
			  item_usage: e.payload.doc.data()['item_usage'],
			  pack_size: e.payload.doc.data()['pack_size'],
			  unit: e.payload.doc.data()['unit'],
			  Description_name: e.payload.doc.data()['Description_name'],
			  Description: e.payload.doc.data()['Description'],
			  Review_name: e.payload.doc.data()['Review_name'],
			  Review_des: e.payload.doc.data()['Review_des'],
			  Brand: e.payload.doc.data()['Brand'],
			  Make: e.payload.doc.data()['Make'],
			  Model: e.payload.doc.data()['Model'],
			  YearOfManufacture: e.payload.doc.data()['YearOfManufacture'],
			  Expiry: e.payload.doc.data()['Expiry'],
			  AgeGroup: e.payload.doc.data()['AgeGroup'],
			  Weight: e.payload.doc.data()['Weight'],
			  Dimensions: e.payload.doc.data()['Dimensions'],
			  Url: e.payload.doc.data()['Url'],
			  Urlimage_view1: e.payload.doc.data()['Urlimage_view1'],
			  Urlimage_view2: e.payload.doc.data()['Urlimage_view2'],
			  Urlimage_view3: e.payload.doc.data()['Urlimage_view3'],
			  Color: e.payload.doc.data()['Color']
			}
			  
			});

			this.deletefun();
			//console.log(this.Product_id)	;
		
		  });
		  
	}

	deleterow(recordRow) {
		let record = {};
		console.log(record)
        record['Deleted'] = false;
		this.fireStoreService.update_Productdetails(recordRow.id, record);
        recordRow.isEdit = false;
	  }
}
