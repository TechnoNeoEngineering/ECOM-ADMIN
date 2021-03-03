import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';
import { FireStoreService } from '../service/fire-store.service';

@Component({
  selector: 'app-layerconfirmation',
  templateUrl: './layerconfirmation.page.html',
  styleUrls: ['./layerconfirmation.page.scss'],
})
export class LayerconfirmationPage implements OnInit {
  layer = 'layer1';
  name:any;
  email:any;
  passcode:any;
  phoneno:any;
  layers:any;
  layerconfirm: any[];
  constructor(private nav:NavController,private firestore: AngularFirestore,private alert: AlertController,
    private firebase: FireStoreService) { }
  

  ngOnInit() {
    // this.firestore.doc('layerconfirmpassword' + '/' + "6kb5RSXKThRHcBh1efpI").delete();

    this.firebase.read_layerconfirmpassword().subscribe(data => {
      this.layerconfirm = data.map(e => {
         console.log(e.payload.doc.data()['Email']);
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['Email'],
          password: e.payload.doc.data()['Passcode'],
          name: e.payload.doc.data()['Name'], 
          phoneno:e.payload.doc.data()['PhoneNo'],
          layer:e.payload.doc.data()['Layer'],

        };
        
    })
      console.log(this.layerconfirm);
    });
  }
  submit(){
    let record = {};
    record['Name'] = this.name;
    record['Email'] = this.email;
    record['PhoneNo'] = this.phoneno;
    record['Layer'] = this.layers;
    record['Passcode'] = this.passcode;
    this.firebase.create_layerconfirmpassword(record);
    console.log(record);
    this.name = '';
    this.passcode = '';
    this.email='';
    this.phoneno='';
    this.layers = '';

  }
 async delete(item){
    const res = await this.alert.create({
      header:'Are you Sure',
      buttons:[{
        text:'cancel',
        handler:()=>{
          console.log('blah');
        }
        },
        {
          text:'Yes',
          handler:()=>{
            this.firestore.doc('layerconfirmpassword'+ '/' + item.id).delete();
            console.log('deleted');
          }
        
      }]
    });
    await res.present();
  }
}
