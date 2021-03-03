import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ResetpinPage } from '../resetpin/resetpin.page';
import { FirestoreservicesService } from '../service/firestoreservice.service';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-layer2pin',
  templateUrl: './layer2pin.page.html',
  styleUrls: ['./layer2pin.page.scss'],
})
export class Layer2pinPage implements OnInit {
  layerconfirm: any[];
  resetquestions: any[];
  phoneno:any;
  school:any;
  native:any;
  color:any;
  password:any;
  cpassword:any;
  questionslength:number;
  tokens:any[];
  createtoken: { id: string; isEdit: boolean; layer: any; phone: any; Token: any; }[];
  constructor(private nav:NavController,public actionSheetController: ActionSheetController,
    private model: ModalController,private firestore:AngularFirestore,
    private firebase: FirestoreservicesService,private alert:AlertController,private faio: FingerprintAIO) { }

  filter(){
    var user = localStorage.getItem('phone');
  return  this.firestore.collection('layerconfirmpassword',(ref)=>ref.where('PhoneNo','==',user)).snapshotChanges()
  }
  filterquestions(){
    var user = localStorage.getItem('phone');
  return  this.firestore.collection('layerconfirmquestions',(ref)=>ref.where('phoneNo','==',user)).snapshotChanges()
  }
  filtertoken(){
    var phone = localStorage.getItem('phone');
   return this.firestore.collection('layertoken' , (ref)=>ref.where('phone','==',phone)).snapshotChanges();
  }
  async ngOnInit() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Unlock with pin or Fingerprint',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Use Pin',
        icon: 'keypad-outline',
        handler: () => {
          console.log('pin');
        }
      }, {
        text: 'Use Fingerprint',
        icon: 'finger-print-outline',
        handler: () => {
          this.finger();
        }
      }]
  });
  await actionSheet.present();
    this.firebase.read_layerToken().subscribe((data) => {			
			this.createtoken = data.map((e) => {				
				return {   
					id: e.payload.doc.id,
					isEdit: false,
          layer:e.payload.doc.data()['layer'],
          phone:e.payload.doc.data()['phone'],
					Token: e.payload.doc.data()['token']
				}
			});
			console.log(this.createtoken);
    });
        this.firestore.doc('layertoken' + '/' + "v249VtAp7VnQJrwryyng").delete();

    var user = localStorage.getItem('phone');
    this.filter().subscribe(data => {
      this.layerconfirm = data.map(e => {
         console.log(e.payload.doc.data()['PhoneNo']);
        return {
         id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['Email'],
          password: e.payload.doc.data()['Passcode'],
          Name: e.payload.doc.data()['Name'],  
          layer: e.payload.doc.data()['Layer'],        
          phoneNo: e.payload.doc.data()['PhoneNo'],       
        };
        
    })
      console.log(this.layerconfirm);
     
    });
    this.firestore.doc('layerconfirmpassword' + '/' + 'Gc8NvaqeBckCLCVjGlwf').delete();
    // this.firestore.doc('layerconfirmquestions' + '/' + "iPWfHTcTrvSYgnoj97oD").delete();


    this.filterquestions().subscribe(data => {
      this.resetquestions = data.map(e => {
         console.log(e.payload.doc.data()['school']);
        return {
         id: e.payload.doc.id,
          isEdit: false,
          school: e.payload.doc.data()['school'],
          native: e.payload.doc.data()["native"],
          color: e.payload.doc.data()['color'],  
          phoneNo: e.payload.doc.data()['phoneNo'],     
          password: e.payload.doc.data()['password'],     

          
        };
        
    })
      console.log(this.resetquestions);
      this.questionslength = this.resetquestions.length;
      // alert(this.questionslength);
    });
    this.filtertoken().subscribe(data => {
      this.tokens = data.map(e => {
         console.log(e.payload.doc.data()['layer']);
        return {
         id: e.payload.doc.id,
          isEdit: false,
          layer: e.payload.doc.data()['layer'],
          token: e.payload.doc.data()["token"],
          phone:e.payload.doc.data()['phone']         
        };
        
    })
      console.log(this.tokens);
      this.questionslength = this.resetquestions.length;
      // alert(this.questionslength);
    });
  }
  submit(){
    var users = localStorage.getItem('phone');
    for(var i=0;i<this.resetquestions.length;i++){
      if(users == this.resetquestions[i]['phoneNo'] && this.password == this.resetquestions[i]['password']){
        this.nav.navigateRoot('/layer2');
      }
      if(users == this.resetquestions[i]['phoneNo'] && this.password != this.resetquestions[i]['password']){
        this.showalert();
      }
     
    }
  }
  finger(){
    this.faio.isAvailable().then((result: any) => {
      console.log(result)

      this.faio.show({
        //cancelButtonTitle: 'Cancel',
        //description: "Some biometric description",
        disableBackup: true,
        title: 'Explora locked',
        fallbackButtonTitle: 'FB Back Button',
        //subtitle: 'This SubTitle'
      })
        .then((result: any) => {
          console.log(result)
          //alert("Successfully Authenticated!");
          this.nav.navigateRoot('/layer2');
          
        })
        .catch((error: any) => {
          console.log(error);
          this.showalert1();         
          //alert("Match not found!")
        });

    })
      .catch((error: any) => {
        console.log(error)
      });
  
  }
 async reset(){
    const res = await this.model.create({
      component:ResetpinPage,
    });
    res.present();
  }
  async showalert(){
    const res = await this.alert.create({
      header:'Sorry !',
      message:'Invalid Passcode',
      buttons:['Okay']
    });
    res.present();
   }
   async showalert1(){
    const res = await this.alert.create({
      header:'Failed!',
      message:'Fingerprint authentication faild!',
      buttons:['Use Pin']
    });
    res.present();
   }

   async logout(){
    const res = await this.alert.create({
      header:'Are You Sure',
      buttons:[{
        text:"Cancel",
        handler:()=>{
          console.log('blah');
        }
        },
        {
          text:'Yes',
          handler:()=>{
            this.nav.navigateRoot('/login');
            var phone = localStorage.getItem('phone');
            alert(phone);
            for(var i=0;i<this.tokens.length;i++){
              if(this.tokens[i]['phone'] == phone){
                this.firestore.doc('layertoken' + '/' + this.tokens[i].id).delete();
                alert('deleted');
              }
              localStorage.removeItem('phone');
            }
          
        }
      }]
    })
   res.present();
  }
  qsubmit(){
    let record ={};
    record['school'] = this.school;
    record['color'] = this.color;
    record['native'] = this.native;
    record['password'] = this.password;
    record['phoneNo'] = this.phoneno;
    this.firebase.create_layerconfirmquestions(record);
    console.log(record);
    this.school='';
    this.color='';
    this.native='';
    this.password ='';
    this.phoneno='';
  }
 

}