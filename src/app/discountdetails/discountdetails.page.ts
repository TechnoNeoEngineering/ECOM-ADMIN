import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

interface DiscountData {
  Discount_id: number;
  From: string;
  To: string;
  Specialdiscount: string;
  Specialcontest: string;
}

@Component({
  selector: 'app-discountdetails',
  templateUrl: './discountdetails.page.html',
  styleUrls: ['./discountdetails.page.scss'],
})
export class DiscountdetailsPage implements OnInit {

  discountlist = [];
  discountdata: DiscountData;
  discountForm: FormGroup;
  max_id: any;

  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,) 
    {
      this.discountdata = {} as DiscountData;
     }

    //  SubCategory(){
    //   this.navCtrl.navigateForward('/view');
    //   }

      ngOnInit() {

        this.discountForm = this.fb.group({
          Discount_id: [, [Validators.required]],
          From: ['', [Validators.required]],
          To: ['', [Validators.required]],
          Specialdiscount: ['', [Validators.required]],
          Specialcontest: ['', [Validators.required]],
        })
    
        this.fireStoreService.read_discount().subscribe(data => {
    
          this.discountlist = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              Discount_id: e.payload.doc.data()['Discount_id'],
              From: e.payload.doc.data()['From'],
              To: e.payload.doc.data()['To'],
              Specialdiscount: e.payload.doc.data()['Specialdiscount'],
              Specialcontest: e.payload.doc.data()['Specialcontest'],
            };
          })
          this.get_max_id();
          // console.log(this.categoryList);
        });
      }
    
      CreateRecord() {
        console.log(this.discountForm.value);
        this.get_max_id();
        this.fireStoreService.create_discount(this.discountForm.value).then(resp => {
          this.discountForm.reset();
          this.ngOnInit();
        })
          .catch(error => {
            console.log(error);
          });
      }
    
      RemoveRecord(rowID) {
        // alert("Delete Disabled");
        this.fireStoreService.delete_discount(rowID);
      }
    
      EditRecord(record) {
        record.isEdit = true;
        record.EditFrom = record.From;
        record.EditTo = record.To;
        record.EditSpecialdiscount = record.Specialdiscount;
        record.EditSpecialcontest = record.Specialcontest;
      }
    
      UpdateRecord(recordRow) {
        let record = {};
        record['From'] = recordRow.EditFrom;
        record['To'] = recordRow.EditTo;
        record['Specialdiscount'] = recordRow.EditSpecialdiscount;
        record['Specialcontest'] = recordRow.EditSpecialcontest;
        this.fireStoreService.update_discount(recordRow.id, record);
        recordRow.isEdit = false;
      }
      get_max_id(){
        var maxid =Math.max.apply(Math, this.discountlist.map(function(o) { return o.Discount_id; }));
        if(maxid<= 0 || maxid==NaN) {
          this.max_id = 1;
        } else {
          this.max_id = maxid+1;
        }
        console.log(this.max_id);
      }

}
