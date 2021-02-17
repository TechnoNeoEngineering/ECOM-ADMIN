import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Platform,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-specialuserrequest',
  templateUrl: './specialuserrequest.page.html',
  styleUrls: ['./specialuserrequest.page.scss'],
})
export class SpecialuserrequestPage implements OnInit {

  RequestForm1: any;

  user: any;
  prdts: any;
  specialuserForm: FormGroup;

  constructor(private fireStoreService: FireStoreService,
    public fb: FormBuilder,private AlertController: AlertController
    ) { }

  ngOnInit() {

    this.specialuserForm = this.fb.group({
      user_id: this.user,
      include_gst: [false, [Validators.required]],
      list: [[]],
    });

    this.fireStoreService.read_specialrequest().subscribe(data => {

      this.RequestForm1 = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Mobile: e.payload.doc.data()['mobile'],
          Address: e.payload.doc.data()['address'],
          Products: e.payload.doc.data()['products'],
          Date: e.payload.doc.data()['date']
        };
      })
      console.log(this.RequestForm1);

      // var prod = JSON.stringify(this.RequestForm1.Products);
      // console.log(prod);
    });
  }

    async accept(special) {
      const alert = await this.AlertController.create({
        header: "Are you sure? Accept Specialuer",
        inputs: [
          {
            // name: special.Email,
            type: 'radio',
            label: special.Email,
            value: special.Email,
            checked: true
          },
          {
            // name:special.Mobile ,
            type: 'radio',
            label: special.Mobile,
            value: special.Mobile,
          },
        ],
        buttons: [
          {
            text:"cancel",
            handler: () => {
              console.log('Confirm cancel');
            }
          },
          {
            text: 'Okay',
              handler: (special) => {
                this.CreateRecord();
                console.log(special);
                this.user = special;
            }
          }
        ]
      });
      await alert.present();
    }
  

  async decline(rowID) {
    const alert = await this.AlertController.create({
      header: "Are you sure? If you want delete",
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
              this.fireStoreService.delete_specialrequest(rowID);
              console.log("hi");
          }
        }
      ]
    });
    await alert.present();
  }

  CreateRecord() {
    console.log(this.specialuserForm.value);
    this.fireStoreService.create_userspecial(this.specialuserForm.value).then(resp => {
      alert(this.user);
      // user_id: this.user;
      // this.ngOnInit;
    })
    .catch(error => {
      console.log(error);
    });
  }


}
