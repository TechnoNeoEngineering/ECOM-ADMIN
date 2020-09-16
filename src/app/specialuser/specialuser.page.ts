import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserlistviewComponent } from '../userlistview/userlistview.component';
import { UsercartComponent } from '../usercart/usercart.component';

interface SpecialuserData {
Category: string;
Age: number;
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
constructor(private fireStoreService: FireStoreService,
public fb: FormBuilder,
public navCtrl: NavController,
private router: Router,private modalCtrl: ModalController)
{
this.specialuserdata = {} as SpecialuserData;
}

SubCategory(){
this.navCtrl.navigateForward('/view');
}

ngOnInit() {

this.specialuserForm = this.fb.group({
user_id: ['', [Validators.required]],
// cat_id: ['', [Validators.required]],
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
list: e.payload.doc.data()['list'],
};
})
this.cart_prodname();
// console.log(this.categoryList);
});
}

CreateRecord() {
console.log(this.specialuserForm.value);
this.fireStoreService.create_userspecial(this.specialuserForm.value).then(resp => {
this.specialuserForm.reset();
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
}

UpdateRecord(recordRow) {
  // console.log(recordRow);
  // delete recordRow['Product_name'];
  // console.log(recordRow);
let record = {};
record['user_id'] = recordRow.EditUserid;
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
      this.productnamearr.push({'id':this.specialuserList[i]['id'],'user_id':this.specialuserList[i]['user_id'], 'list':this.specialuserList[i]['list'], 'Product_name': this.cartprodname});
      console.log(this.productnamearr);
    }
    else {
      this.productnamearr.push({'id':this.specialuserList[i]['id'],'user_id':this.specialuserList[i]['user_id'], 'list': [], 'Product_name': []});
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