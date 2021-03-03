import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import { FirestoreservicesService } from '../service/firestoreservice.service';

@Component({
  selector: 'app-layer2',
  templateUrl: './layer2.page.html',
  styleUrls: ['./layer2.page.scss'],
})
export class Layer2Page implements OnInit {

  RequestForm1: any[];
  search: any;
  constructor(private fireStoreService:FirestoreservicesService,
              private firestore: AngularFirestore,
              private nav : NavController,
              private load: LoadingController) { }

              async ngOnInit() {
                //   var today = new Date().toLocaleString();
                //    var diff = new Date(today).getTime() - new Date(today).getTime();
                //   console.log(today);
                //   console.log(new Date().getTime());
                //   console.log(diff);
                //  var output = Math.floor(diff  / 3600000)+'Hours and'+Math.floor((diff  % 3600000) / 60000)+'minutes';
                // console.log(output);
                
                    const res = await this.load.create({
                      message:"Please Wait",
                      spinner:'dots'
                    });
                    res.present();
                
                
                    this.fireStoreService.read_specialrequest().subscribe(data => {
                      this.RequestForm1 = data.map(e => {
                        console.log(e.payload.doc.data()['date']);
                       res.dismiss();
                        return {
                          id: e.payload.doc.id,
                          isEdit: false,
                          Name: e.payload.doc.data()['name'],
                          Email: e.payload.doc.data()['email'],
                          Mobile: e.payload.doc.data()['mobile'],
                          Address: e.payload.doc.data()['address'],
                          Products: e.payload.doc.data()['products'],
                          Date: e.payload.doc.data()['date'],
                          layer1confirmation:e.payload.doc.data()['layer1confirmation'],
                          layer2confirmation:e.payload.doc.data()['layer2confirmation'],
                
                        };
                    })
                      console.log(this.RequestForm1);
                    });
                  }
                  logout(){
                    this.nav.navigateRoot('/layer2pin');
                    // localStorage.removeItem('user');
                  }
                  accept(special){
                    let record = {};
                    record['layer1confirmation'] = 'Accept';
                    this.firestore.doc('Specialuserrequest' + '/' + special.id).update(record);
                    alert('Update');  
                  }
                  decline(special){
                    let record = {};
                    record['layer1confirmation'] = 'Decline';
                    record['layer2confirmation'] = 'Decline';
                    this.firestore.doc('Specialuserrequest' + '/' + special.id).update(record);
                    alert('Update');  
                  }
                  view(item){
                    this.nav.navigateForward('/layer2confirmation');
                    localStorage.setItem('layer2',JSON.stringify(item));
                  }
                  serachfilter(){
                    // alert(this.search);
                    this.fireStoreService.read_specialrequest().subscribe(data => {
                      this.RequestForm1 = data.map(e => {
                        console.log(e.payload.doc.data()['layer1confirmation']);
                        //  if(e.payload.doc.data()['layer2confirmation'] == undefined ){
                        return {
                          id: e.payload.doc.id,
                          isEdit: false,
                          Name: e.payload.doc.data()['name'],
                          Email: e.payload.doc.data()['email'],
                          Mobile: e.payload.doc.data()['mobile'],
                          Address: e.payload.doc.data()['address'],
                          Products: e.payload.doc.data()['products'],
                          Date: e.payload.doc.data()['date'],
                          layer1confirmation:e.payload.doc.data()['layer1confirmation'],
                          layer2confirmation:e.payload.doc.data()['layer2confirmation'],
                
                        };
                      // }
                    })
                    // if(this.search == null || this.search == undefined || this.search == ''){
                    //   this.ngOnInit();
                    // }
                    // else{
                      this.RequestForm1 =  this.RequestForm1.filter((res)=>{
                        return  res.Name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                        });
                    // }
                      console.log(this.RequestForm1);
                    });
                  }
                }
