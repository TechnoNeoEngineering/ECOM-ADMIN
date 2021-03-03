import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Platform,AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-productrequests',
  templateUrl: './productrequests.page.html',
  styleUrls: ['./productrequests.page.scss'],
})
export class ProductrequestsPage implements OnInit {
  productrequstdtails= [];
  ProductviewList: any[];
  max_id: any;
  constructor(private fireStoreService: FireStoreService,private firestore: AngularFirestore,
    public fb: FormBuilder,private AlertController: AlertController) { }

  ngOnInit() {

    this.fireStoreService.read_Productdetails().subscribe(data => {

      this.ProductviewList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Product_id: e.payload.doc.data()['Product_id'],
          Deleted: e.payload.doc.data()['Deleted'],
        };
      });
      this.get_max_id();
    });

    this.fireStoreService.read_productrequest().subscribe(data=>{
      this.productrequstdtails = data.map(e=>{
        // alert(e.payload.doc.data()['Review'])
        return {
          id:e.payload.doc.id,
          isEdit: false,
          userid:e.payload.doc.data()['userid'],
          Adminlocation:e.payload.doc.data()['Adminlocation'],
          // location:e.payload.doc.data()['location'],
          // userid:e.payload.doc.data()['userid'],
          Productrequest_id:e.payload.doc.data()['Productrequest_id'],
          currentdate:e.payload.doc.data()['currentdate'],
          productrequest:e.payload.doc.data()['productrequest'],
          Id:e.payload.doc.data()['Id'],
          SubCategory_id: e.payload.doc.data()['SubCategory_id'],
          Enabled: e.payload.doc.data()['Enabled'],
          Deleted: e.payload.doc.data()['Deleted'],
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id'],
          sku: e.payload.doc.data()['sku'],
          Star: e.payload.doc.data()['Star'],
          Review: e.payload.doc.data()['Review'],
          // Range: e.payload.doc.data()['Range'],
          stock: e.payload.doc.data()['stock'],
          addstock: e.payload.doc.data()['addstock'],
          Normal_price: e.payload.doc.data()['Normal_price'],
          Price1: e.payload.doc.data()['Price1'],
          Range1_from: e.payload.doc.data()['Range1_from'],
          Range1_to: e.payload.doc.data()['Range1_to'],
          Price2: e.payload.doc.data()['Price2'],
          Range2_from: e.payload.doc.data()['Range2_from'],
          Range2_to: e.payload.doc.data()['Range2_to'],
          Price3: e.payload.doc.data()['Price3'],
          Range3_from: e.payload.doc.data()['Range3_from'],
          Range3_to: e.payload.doc.data()['Range3_to'],
          Price4: e.payload.doc.data()['Price4'],
          Range4_from: e.payload.doc.data()['Range4_from'],
          Range4_to: e.payload.doc.data()['Range4_to'],
          Price5: e.payload.doc.data()['Price5'],
          Range5_from: e.payload.doc.data()['Range5_from'],
          Range5_to: e.payload.doc.data()['Range5_to'],
          Price6: e.payload.doc.data()['Price6'],
          Range6_from: e.payload.doc.data()['Range6_from'],
          Range6_to: e.payload.doc.data()['Range6_to'],
          Price7: e.payload.doc.data()['Price7'],
          Range7_from: e.payload.doc.data()['Range7_from'],
          Range7_to: e.payload.doc.data()['Range7_to'],
          Price8: e.payload.doc.data()['Price8'],
          Range8_from: e.payload.doc.data()['Range8_from'],
          Range8_to: e.payload.doc.data()['Range8_to'],
          Price9: e.payload.doc.data()['Price9'],
          Range9_from: e.payload.doc.data()['Range9_from'],
          Range9_to: e.payload.doc.data()['Range9_to'],
          Price10: e.payload.doc.data()['Price10'],
          Range10_from: e.payload.doc.data()['Range10_from'],
          Range10_to: e.payload.doc.data()['Range10_to'],
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
          Color: e.payload.doc.data()['Color'],
          composition: e.payload.doc.data()['composition'],
          howtouse: e.payload.doc.data()['howtouse'],
          application: e.payload.doc.data()['application'],
          packagecontents: e.payload.doc.data()['packagecontents']

        }
        
      });
      console.log(this.productrequstdtails);
    });
  }

  async accept(special) {
    const alert = await this.AlertController.create({
      header: "Are you sure? Accept Product",
      buttons: [
        {
          text:"cancel",
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Okay',
            handler: () => {
              this.get_max_id();
              //  alert(this.max_id);
              this.firestore.doc('Admin_productrequest' + '/' + special.id).update({
                Product_id:this.max_id,
              })
              this.CreateRecord(special);
          }
        }
      ]
    });
    await alert.present();
  }


  async decline(special) {
    const alert = await this.AlertController.create({
      header: "Are you sure? If you want decline",
      buttons: [
        {
          text:"cancel",
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Okay',
            handler: () => {
              this.firestore.doc('Admin_productrequest' + '/' + special.id).update({
                productrequest:"Decline",
              })
              console.log("hi");
          }
        }
      ]
    });
    await alert.present();
  }

  CreateRecord(special) {
    
   
    console.log(special);
    this.fireStoreService.create_Productdetails(special).then(resp => {
    })
      .catch(error => {
        console.log(error);
      });
  }

  get_max_id() {
    var maxid = Math.max.apply(Math, this.ProductviewList.map(function (o) { return o.Product_id; }));
    if (maxid <= 0 || maxid == NaN) {
      this.max_id = 1;
    } else {
      this.max_id = maxid + 1;
      console.log(this.max_id);
    }
  }


}
