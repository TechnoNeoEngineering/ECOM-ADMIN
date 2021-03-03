import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FirestoreservicesService } from '../service/firestoreservice.service';

@Component({
  selector: 'app-resetpin',
  templateUrl: './resetpin.page.html',
  styleUrls: ['./resetpin.page.scss'],
})
export class ResetpinPage implements OnInit {
  new:any;
  old:any;
  cnew:any;
  native:any;
  color:any;
  phoneno:any;
  school:any;
  layerconfirm: any[];
  resetquestions:any[];
  Reset = false;
  constructor(private modelctl: ModalController,private firebase: FirestoreservicesService,
              private firestore: AngularFirestore,private nav: NavController,private alert: AlertController) { }
              

   filterquestions(){
    var user = localStorage.getItem('phone');
  return  this.firestore.collection('layerconfirmquestions',(ref)=>ref.where('phoneNo','==',user)).snapshotChanges()
  }           

  ngOnInit() {    
    this.firebase.read_layerconfirmpassword().subscribe(data => {
      this.layerconfirm = data.map(e => {
        //  console.log(e.payload.doc.data()['Email'] )
        return {
          iid: e.payload.doc.id,
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
    });
  }

  submit(){

    for(var i=0;i<this.resetquestions.length;i++){
      // console.log(this.resetquestions[i]['native'].toLowerCase() == this.native.toLowerCase());
      if(this.resetquestions[i]['native'].toLowerCase() == this.native.toLowerCase() && this.resetquestions[i]['school'].toLowerCase() == this.school.toLowerCase() &&
        this.resetquestions[i]['phoneNo'] == this.phoneno && this.resetquestions[i]['color'].toLowerCase() == this.color.toLowerCase()){
          this.Reset = true;
        }
        else{
          this.Reset = false;
          this.showalert('Sorry' , "Your Answer Doesn't Match Please Contact admin");
        }
    }
    
  }
  reset(){
    var user = localStorage.getItem('phone');
    var userdetails = this.resetquestions.filter(userdet=>userdet.phoneNo === user);  
    if(this.cnew == this.new){ 
      this.firestore.collection('layerconfirmquestions').doc(userdetails[0].id).update({
        password:this.new
      });
      this.new='';
      this.cnew='';
      this.showalert('Password Reset Successfully','Now You Can login With this Credential');
      this.modelctl.dismiss();
    }
    else{
      this.showalert('Sorry !',"Invalid  Password And confirm password Doesn't match");
    }
  }
  model(){
    this.modelctl.dismiss();
  }
  async showalert(header:string,message:string){
   const res = await this.alert.create({
     header,
     message,
     buttons:['Okay']
   });
   res.present();
  }

  // create(){
  //   let record = {};
  //   record['email'] = 'layer2@gmail.com';
  //   record['password'] = '1234567';
  //   record['pincode'] = '1010';
  //   this.firebase.create_layerconfirmpassword(record);
  //   console.log(record);
  // }
  // reset(){
  //   alert(this.dob)
  //   if(this.dob == '1999-11-09' && this.oldpassword == '2222'){
  //     alert("Your Password Reset");
  //     // this.firestore.doc('Specialuserresetpassword').update({
        
  //     // })
  //   }
  //   else{
  //     alert('Again Enter')
  //   }
  // }
}

