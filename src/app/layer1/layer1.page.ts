import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { FirestoreservicesService } from '../service/firestoreservice.service';

@Component({
  selector: 'app-layer1',
  templateUrl: './layer1.page.html',
  styleUrls: ['./layer1.page.scss'],
})
export class Layer1Page implements OnInit {
  
  RequestForm1: any[];
  search:string;
  createtoken: any[];
	base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
	originaltoken: { id: string; isEdit: boolean; Token: any; }[];
	title:any;
	body:any;
	inputdata: InputVal;
	outputdata:ReturnVal;
  constructor(private fireStoreService:FirestoreservicesService,
              private firestore: AngularFirestore,
              private nav : NavController,
              private load: LoadingController,private http: HttpClient) {this.inputdata = new InputVal();}  
              httpOptions = {
                headers: new HttpHeaders({          
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer AAAAyIbj1hI:APA91bFm9qtzkEqNGMikySL2e4TNWFopu3Mo1OG10Zy3nFQvZc-wQAAFE4ZAeGyS6MMe1dFWGZ9kInrcj2CYcGA2tD_V7cLHkhvttHcajJ6TNsc8rVNjqXSDieFGoyzwnTqid9x0CvqQ',                  
                  'project_id' : 'mindmaxecommerce-2a890',         
                  "Access-Control-Allow-Headers":"x-requested-with, x-requested-by",
                })
                }
                handleError(error: HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                  // A client-side or network error occurred. Handle it accordingly.
                  console.error('An error occurred:', error.error.message);
                } else {
                  // The backend returned an unsuccessful response code.
                  // The response body may contain clues as to what went wrong,
                  console.error(
                  `Backend returned code ${error.status}, ` +
                  `body was: ${error.error}`);
                }
                // return an observable with a user-facing error message
                return throwError(
                  'Something bad happened; please try again later.');
                };
 async ngOnInit() {  
  this.fireStoreService.read_layerToken().subscribe((data) => {			
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
    const res = await this.load.create({
      message:"Please Wait",
      spinner:'dots'
    });
    res.present();

    this.fireStoreService.read_specialrequest().subscribe(data => {
      this.RequestForm1 = data.map(e => {
        console.log(e.payload.doc.data()['layer1confirmation']);
        //  if(e.payload.doc.data()['layer2confirmation'] == undefined ){
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
        
      // }
    })
      console.log(this.RequestForm1);
    });
    
  }

  logout(){
    this.nav.navigateRoot('/layer1pin');
    // localStorage.removeItem('user');
  }
  accept(special){
    let record = {};
    record['layer1confirmation'] = 'Accept';
    this.firestore.doc('Specialuserrequest' + '/' + special.id).update(record);
    alert('Update'); 
    this.send(); 
  }
  decline(special){
    let record = {};
    record['layer1confirmation'] = 'Decline';
    record['layer2confirmation'] = 'Decline';
    this.firestore.doc('Specialuserrequest' + '/' + special.id).update(record);
    alert('Update');  
    
  }
  view(item){
    this.nav.navigateForward('/layer1confirmation');
    localStorage.setItem('layer1',JSON.stringify(item));
  }
  send(){		  
    let it = new InputVal();	  
    for(var i=0;i<this.createtoken.length;i++){
      if((this.createtoken[i]['layer'] == "layer2")){
        // alert(this.createtoken[i]['Token']);
      it.to = this.createtoken[i]['Token'];
      console.log(it.to);
      this.createItem(it).subscribe(t =>{
      console.log(JSON.stringify(t));
      });		  
     }
    }		
    }
    createItem(it): Observable<ReturnVal> {
    var user = localStorage.getItem('email');						   
     it.notification.title = "Layer1 Accept" ;
    it.notification.body = user;
     
     return this.http
      .post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
    }
  serachfilter(){
   
    // alert(this.search);
    this.fireStoreService.read_specialrequest().subscribe(data => {
      this.RequestForm1 = data.map(e => {
        console.log(e.payload.doc.data()['layer1confirmation']);
        
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
    


    if(this.search == null || this.search == undefined || this.search == ''){
      this.ngOnInit();
    }
    else{
      this.RequestForm1 =  this.RequestForm1.filter((res)=>{
        return  res.Name.toLowerCase().indexOf(this.search.toLowerCase()) == 0;
        });
    }
      console.log(this.RequestForm1);
    });
   
  }
}
