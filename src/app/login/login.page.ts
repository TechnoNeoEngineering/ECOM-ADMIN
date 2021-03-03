import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { FirestoreservicesService } from '../service/firestoreservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneNumber:string;
  moblogin:FormGroup;
  recaptchaVerifier:firebase.default.auth.RecaptchaVerifier;
  something;
  layerconfirm: any[];
  createtoken: any;
  constructor(private nav: NavController,private alert:AlertController,private load: LoadingController,
              private firebase: FirestoreservicesService,private formBuilder: FormBuilder,private firestore:AngularFirestore) {
                this.moblogin = this.formBuilder.group({
                  phoneNumber: ['', [Validators.compose([
                  Validators.minLength(10),
                  Validators.maxLength(10),
                  Validators.pattern('[6-9]{1}[0-9]{9}'),
                  Validators.required
                ])]],
                });
               }

  ngOnInit() {
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
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');    
    // this.firestore.doc('layerconfirmpassword' + '/' + "Gc8NvaqeBckCLCVjGlwf").delete();

    
    this.firebase.read_layerconfirmpassword().subscribe(data => {
      this.layerconfirm = data.map(e => {
         console.log(e.payload.doc.data()['Email'] )
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
  }
  form_moblogin(phoneNumber){
    let mob= this;
    for(var i=0;i<this.layerconfirm.length;i++){    
    if(mob.moblogin.valid && this.layerconfirm[i]['phoneNo'] == phoneNumber){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + this.phoneNumber;
    firebase.default.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( async (confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = await this.alert.create({
        header: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Verify',
            handler: data => { 
              confirmationResult.confirm(data.confirmationCode).then(async res=>{
                try{
                  const loading = this.load.create({
                    message:"Please Wait...",
                    spinner:'dots'
                  });
                  (await loading).present();
                  if(!confirmationResult){
                    this.showalert("Error",'verify');
                  }
                  var token = localStorage.getItem('token');
                  for(var i=0;i<this.layerconfirm.length;i++){
                   if((this.layerconfirm[i]['phoneNo'] == this.phoneNumber) && (this.layerconfirm[i]['layer'] == "Layer1")){
                    //alert(this.layerconfirm[i]['layer']);
                    //alert(this.layerconfirm[i]['phoneNo']);
                  this.load.dismiss();
                  this.nav.navigateForward(['layer1pin']);
                  localStorage.setItem('layer',"layer1");
                  localStorage.setItem('phone',phoneNumber );
                 this.load.dismiss();
                 var token = localStorage.getItem('token');
                 var layer = localStorage.getItem('layer');
                 var phone = localStorage.getItem('phone');
                 let record = {};
                 record['layer'] = layer
                 record['token'] = token
                 record['phone'] = phone
                 this.firebase.create_layerToken(record);
                 console.log(record);
                 //alert(record);

                  }
                }
                for(var i=0;i<this.layerconfirm.length;i++){
                  if((this.layerconfirm[i]['phoneNo'] == this.phoneNumber) && (this.layerconfirm[i]['layer'] == "Layer2")){                                                             
                 this.nav.navigateForward(['layer2pin']);
                 localStorage.setItem('layer',"layer2");
                 localStorage.setItem('phone',phoneNumber );
                 this.load.dismiss();      
                 var token = localStorage.getItem('token');
                 var layer = localStorage.getItem('layer');
                 var phone = localStorage.getItem('phone');                 
                 let record = {};
                 record['layer'] = layer
                 record['token'] = token
                 record['phone'] = phone
                 this.firebase.create_layerToken(record);
                 //console.log(record);
                 //alert(record);
                 }
               }             
              }                
                catch(err){
                  console.log(err);
                  if(err.Code === "auth/invalid-verification-code"){
                   this. showalert('Sorry','Invalid Verfication code');
                  }
                }
              })
        }}
        ]
      });
      await prompt.present();
    })
    let found = false;

  for(var i=0;i<this.layerconfirm.length;i++){
    if((this.layerconfirm[i]['phoneNo'] == this.phoneNumber)){
        found = true;
     }
 }
 if(found = false){
   
  this.showalert("Sorry!","This Number Doesn't Registerd");  

 }
  
}
    }
  // if(mob.moblogin.valid ){
  //   this.showalert("Incomplete!","Please enter the MobileNo.");
  // }
  
     
        
    }
  
    
    async showalert(header:string,message:string){
      const res = this.alert.create({
        header,
        message,
        buttons:['Okay']
      });
       (await res).present();
    }  
}
