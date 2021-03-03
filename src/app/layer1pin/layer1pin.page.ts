import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { ResetpinPage } from '../resetpin/resetpin.page';
import { FirestoreservicesService } from '../service/firestoreservice.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-layer1pin',
  templateUrl: './layer1pin.page.html',
  styleUrls: ['./layer1pin.page.scss'],
})
export class Layer1pinPage implements OnInit {
  layerconfirm: any[];
  resetquestions: any[];
  phoneno:any;
  school:any;
  native:any;
  color:any;
  password:any;
  cpassword:any;
  questionslength:number;
  useridtokens: any[];
  tokens: { id: string; isEdit: boolean; layer: any; token: any; phone: any; }[];
  constructor(private nav:NavController,public actionSheetController: ActionSheetController,
    private firestore: AngularFirestore,private alert: AlertController,
    private firebase: FirestoreservicesService,private model: ModalController,private faio: FingerprintAIO) { }

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
                  // this.questionslength = this.resetquestions.length;
                  // alert(this.questionslength);
                });
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
                this.firestore.doc('layerconfirmpassword' + '/' + "7ctDhYy1ETKHUBc8Sc2B").delete();
            
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
              }
              
            
              submit(){
                //alert("1");
                var users = localStorage.getItem('phone');
                for(var i=0;i<this.resetquestions.length;i++){
                  if(users == this.resetquestions[i]['phoneNo'] && this.password == this.resetquestions[i]['password']){
                    this.nav.navigateRoot('/layer1');          
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
                      this.nav.navigateRoot('/layer1');
                      
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
                        var notify = localStorage.getItem('phone');
                        let found = false;
                        // let usertokenid = this.useridtokens.filter(userdet=>userdet.userid === notify);
                        // alert(usertokenid);
                        for(var i=0;i<this.tokens.length;i++){
                          if(this.tokens[i]['phone'] == notify){
                            this.firestore.doc('layertoken' + '/' + this.tokens[i].id).delete();
                            alert('deleted');
                          }
                        }
                        localStorage.removeItem('phone');
                        this.nav.navigateRoot('/login')
                      
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
