import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserlistviewComponent } from '../userlistview/userlistview.component';
import { UsercartComponent } from '../usercart/usercart.component';
import { AngularFirestore } from '@angular/fire/firestore';

interface SpecialuserData {
  user_id: string;
  // include_gst: boolean;
}

@Component({
  selector: 'app-specialuser',
  templateUrl: './specialuser.page.html',
  styleUrls: ['./specialuser.page.scss'],
})

export class SpecialuserPage implements OnInit {

  specialuserList = [];
  specialuserdata: SpecialuserData;
  specialuserForm: FormGroup;
  userid:any;
  ProductviewList:any;
  productnamearr:any[]=[];
  cartprodname:any[]=[];

  // monthly reward

  monthlyamount: any;
  totaltotal: any =[];
  orderarr: any;
  reward: any;

  discountlist = [];

    constructor(private fireStoreService: FireStoreService,
      public fb: FormBuilder,private firestore: AngularFirestore, 
      public navCtrl: NavController,private ourFire: FireStoreService,
      private router: Router,private modalCtrl: ModalController)
      {
      this.specialuserdata = {} as SpecialuserData;
      }

  SubCategory(){
    this.navCtrl.navigateForward('/view');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getMonth() + days);
    return date;
  }

  read_orderdetails(){
    var user = localStorage.getItem('email');
    return this.firestore.collection('orderdetails').snapshotChanges();
   }

  ngOnInit() {

    this.specialuserForm = this.fb.group({
    user_id: ['', [Validators.required]],
    include_gst: [false, [Validators.required]],
    list: [[]],
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

    this.fireStoreService.read_userspecial().subscribe(data => {

      this.specialuserList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          user_id: e.payload.doc.data()['user_id'],
          include_gst: e.payload.doc.data()['include_gst'],
          list: e.payload.doc.data()['list'],
        };
      })
      console.log(this.specialuserList);
      this.cart_prodname();
      // console.log(this.categoryList);
    });

    this.read_orderdetails().subscribe((data) => {
      this.orderarr = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userid: e.payload.doc.data()['userid'],
          Productid: e.payload.doc.data()['Productid'],
          image: e.payload.doc.data()['image'],
          Quantity: e.payload.doc.data()['Quantity'],
          Price: e.payload.doc.data()['Price'],
          totalamount: e.payload.doc.data()['totalamount'],
          product_orderdate: e.payload.doc.data()['product_orderdate'],
          address: e.payload.doc.data()['address'],
          phoneno: e.payload.doc.data()['phoneno'],
          orderid: e.payload.doc.data()['orderid'],
          paymentid: e.payload.doc.data()['paymentid'],
          shipmentid: e.payload.doc.data()['shipmentid'],
          shipmentdate: e.payload.doc.data()['shipmentdate'],
          paymentdetails: e.payload.doc.data()['paymentdetails'],
          paymentstatus: e.payload.doc.data()['paymentstatus'],
          trackmentid: e.payload.doc.data()['trackmentid'],
          deliverstatus: e.payload.doc.data()['deliverstatus'],
          deliverdate: e.payload.doc.data()['deliverdate'],
          deliveraddress: e.payload.doc.data()['deliveraddress'],
          returnstatus: e.payload.doc.data()['returnstatus'],
          ordertotal: e.payload.doc.data()['ordertotal'],
          delivery_date:e.payload.doc.data()['delivery_date'],
          returndate: e.payload.doc.data()['returndate'],
          product_canceldate: e.payload.doc.data()['product_canceldate']
        }
      });

      // -------------------------------- monthly Bouns special user ----------------------

      var currentdate = new Date();
      var fromDate=this.addDays(currentdate,-30);

      this.totaltotal = this.orderarr.filter(totalttm => totalttm.product_orderdate > fromDate);
    
      console.log(this.totaltotal);
  
      console.log(fromDate);
      console.log(currentdate);
      this.monthlyamount = 0;
      // if(){
        console.log(this.orderarr);
        // for(var k=0; k < this.specialuserList.length; i++){
        //  for(var i=0; i < this.orderarr.length; i++){
        //     if(this.specialuserList[k].user_id == this.orderarr[i].userid){
        //       for(var j=0; j < this.totaltotal.length; j++){
        //         var totalamount2 = this.totaltotal[j].totalamount;
        //         this.monthlyamount = +totalamount2 + +this.monthlyamount;
        //       }
        //       console.log(this.monthlyamount);
        //       break;
        //     }
        //   }
        // }
    });

    this.ourFire.read_discount().subscribe(data => {
    
      this.discountlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userid: e.payload.doc.data()['user'],
          Discount_id: e.payload.doc.data()['Discount_id'],
          From: e.payload.doc.data()['From'],
          To: e.payload.doc.data()['To'],
          Specialdiscount: e.payload.doc.data()['Specialdiscount'],
          Specialcontest: e.payload.doc.data()['Specialcontest'],
        };
      })
      console.log(this.discountlist);
      // ------------------------- reward --------------------------------

      console.log(this.monthlyamount);
      // for(var i=0; i < this.orderarr.length; i++){
      //   for(var k=0; k < this.specialuserList.length; i++){
      //     if(this.specialuserList[k].user_id == this.orderarr[i].userid){
      //       for(var r=0; r < this.discountlist.length; r++){
      //         if(this.monthlyamount > this.discountlist[r].From && this.monthlyamount < this.discountlist[r].To) {

      //           this.reward = this.discountlist[r].Specialdiscount;
      //         }
      //       }
      //     }
      //   }
      // }
      // console.log(this.reward);
      // if(this.reward == null || this.reward == undefined || this.reward == NaN) {
      //   this.reward = 0;
      // }
    });
  }

  CreateRecord() {
    console.log(this.specialuserForm.value);
    this.fireStoreService.create_userspecial(this.specialuserForm.value).then(resp => {
      this.specialuserForm.reset();
      this.ngOnInit();
    })
    .catch(error => {
      console.log(error);
    });
  }

  RemoveRecord(rowID) {
    // this.fireStoreService.delete_userspecial(rowID);
    alert("delete option disabled");
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditUserid = record.user_id;
    record.Editinclude_gst = record.include_gst;
  }

  UpdateRecord(recordRow) {
    console.log(recordRow);
    // delete recordRow['Product_name'];
    // console.log(recordRow);
  let record = {};
  record['user_id'] = recordRow.EditUserid;
  record['include_gst'] = recordRow.Editinclude_gst;
  this.fireStoreService.update_userspecial(recordRow.id, record);
  recordRow.isEdit = false;
  }

  cart_prodname(){
    console.log(this.specialuserList + ','+ this.specialuserList.length);
    for(var i=0; i<this.specialuserList.length;i++){
      if(this.specialuserList[i]['list'] != null || this.specialuserList[i]['list'] != undefined){
        var usercart = this.specialuserList[i]['list'];
        this.cartprodname = [];
        for(var j=0; j<usercart.length;j++){ 
          for(var k=0; k<this.ProductviewList.length; k++){
            var productname = this.ProductviewList[k];
            if(usercart[j]==productname['Product_id']){    
              this.cartprodname.push(productname['Product_name']);
            }
          }     
        }
        this.productnamearr.push({'id':this.specialuserList[i]['id'],'user_id':this.specialuserList[i]['user_id'],'include_gst': this.specialuserList[i]['include_gst'], 'list':this.specialuserList[i]['list'], 'Product_name': this.cartprodname});
        console.log(this.productnamearr);
      }
      else {
        this.productnamearr.push({'id':this.specialuserList[i]['id'],'user_id':this.specialuserList[i]['user_id'],'include_gst': this.specialuserList[i]['include_gst'], 'list': [], 'Product_name': []});
      }
    }
  }

  async openModel(recordRow) {
    // delete recordRow['Product_name'];
      this.userid = recordRow;
      const modal = await this.modalCtrl.create({
        component: UserlistviewComponent,
        componentProps: {
          'user_id': this.userid,
        }
      });
    
      await modal.present();
    }

    async opencartModel(recordRow) {
      // delete recordRow['Product_name'];
      this.userid = recordRow;
      const modal = await this.modalCtrl.create({
        component: UsercartComponent,
        componentProps: {
          'user_id': this.userid,
        }
      });
    
      await modal.present();
    }

}