import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { FirestoreservicesService } from '../service/firestoreservice.service';

@Component({
  selector: 'app-layer2confirmation',
  templateUrl: './layer2confirmation.page.html',
  styleUrls: ['./layer2confirmation.page.scss'],
})
export class Layer2confirmationPage implements OnInit {
  items: any;
  createtoken: any[];
	base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
	originaltoken: { id: string; isEdit: boolean; Token: any; }[];
	title:any;
	body:any;
	inputdata: InputVal;
	outputdata:ReturnVal;
  constructor(private firestore:AngularFirestore,
    private firestoreservice:FirestoreservicesService,
    private http: HttpClient) {this.inputdata = new InputVal();}
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
  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('layer2'));
    this.firestoreservice.read_superadmintoken().subscribe((data) => {			
			this.createtoken = data.map((e) => {				
				return {   
					id: e.payload.doc.id,
					isEdit: false,
					Token: e.payload.doc.data()['Token']
				}
			});
			console.log(this.createtoken);
    });
  }
  decline(){
    this.items.layer2confirmation = "Decline";
    this.firestore.doc('Specialuserrequest'+'/'+this.items.id).update({
    layer2confirmation:"Decline",
   });
   console.log(this.items);
  }
  accept(){
    this.items.layer2confirmation = "Accept";
    this.firestore.doc('Specialuserrequest'+'/'+this.items.id).update({
    layer2confirmation:"Accept",
   });
   this.send();
   console.log(this.items);

  }	  
    send(){
      let it = new InputVal();
      for(var i=0;i<this.createtoken.length;i++){
         it.to = this.createtoken[i]['Token'];
        //it.to ="fKPCN9a9Onw_eeoyZtK0cZ:APA91bHDMGYFZN6qfwY0zbLCnoPxFaHn05K-zDsyJYDIWVlcydU9i55T4R0I5nbbiYD0x_mmJqi01zQ4rQBljMQCzJwZLLZ-nMSpeOBSqynMC2ip8Bcpn05fx8tFal7STilYODIBUuqk"
        console.log(it.to);
        this.createItem(it).subscribe(t =>{
          console.log(JSON.stringify(t));
        });                  
        }
    }
    createItem(it): Observable<ReturnVal> {
    var user = localStorage.getItem('email');						   
     it.notification.title = "Layer2 Accepted" ;
    it.notification.body = user;
     
     return this.http
      .post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
    }
}