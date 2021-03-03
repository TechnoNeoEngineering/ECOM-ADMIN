import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { FirestoreservicesService } from './service/firestoreservice.service';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  layerconfirm: any[];
  useridtokens:  any[];
  constructor(private platform: Platform, private firestore:AngularFirestore, 
              private firestoreservice: FirestoreservicesService,           
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private nav: NavController,
              private fcm : FCM) {
    this.initializeApp();
  }
  filter(){
    var user = localStorage.getItem('phone');
  return  this.firestore.collection('layerconfirmpassword',(ref)=>ref.where('PhoneNo','==',user)).snapshotChanges()
  }

  initializeApp(){
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
				this.statusBar.backgroundColorByHexString("#803f8d");
			}
			if (!firebase.default.apps.length) {
				firebase.default.initializeApp(environment.firebaseConfig);
			}
			//this.statusBar.styleDefault();
			this.splashScreen.hide();
			if(this.platform.is('cordova')){
        this.fcm.getToken().then(token => {
          console.log(token);
          localStorage.setItem('token',token)
      });			
      }	
				else{(!this.platform.is('cordova'))        
        console.log("cordova_not_available");
      }
    })
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
      var user = localStorage.getItem('phone');
      for(var i=0;i<this.layerconfirm.length;i++){
        if((user == this.layerconfirm[i]['phoneNo']) && (this.layerconfirm[i]['layer'] == "Layer2")){
          this.nav.navigateRoot('/layer2pin');
        }
        if((user == this.layerconfirm[i]['phoneNo']) && (this.layerconfirm[i]['layer'] == "Layer1")){
         this.nav.navigateRoot('/layer1pin');
       }
      //  if(!user){
      //    this.nav.navigateRoot('/login');
      //  }
      }
    });   
    
  }

  }
