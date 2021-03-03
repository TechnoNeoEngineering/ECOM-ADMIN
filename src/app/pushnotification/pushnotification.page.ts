import { Component, OnInit, Output } from '@angular/core';
import firebase from 'firebase';
import { FireStoreService } from '../service/fire-store.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';

// import * as cors from 'cors';
import { HTTP } from '@ionic-native/http/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
// const corsHandler = cors({origin: true});
  

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.page.html',
  styleUrls: ['./pushnotification.page.scss'],
})
export class PushnotificationPage implements OnInit {
  tokens: any;
  base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
  originaltoken: { id: string; isEdit: boolean; Token: any; }[];
  title:any;
  body:any;  
  inputdata: InputVal;
  outputdata:ReturnVal;
  constructor(private firebaseservice: FireStoreService, private firestore: AngularFirestore,             
              private http: HttpClient) { this.inputdata = new InputVal();}

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

              send(){
                let it = new InputVal();
                for(var i=0;i<this.tokens.length;i++){
                   it.to = this.tokens[i]['Token'];
                  //it.to ="fKPCN9a9Onw_eeoyZtK0cZ:APA91bHDMGYFZN6qfwY0zbLCnoPxFaHn05K-zDsyJYDIWVlcydU9i55T4R0I5nbbiYD0x_mmJqi01zQ4rQBljMQCzJwZLLZ-nMSpeOBSqynMC2ip8Bcpn05fx8tFal7STilYODIBUuqk"
                  console.log(it.to);
                  this.createItem(it).subscribe(t =>{
                    console.log(JSON.stringify(t));
                  });                  
                  }
                 this.title = '';
                 this.body = '';
              }
              createItem(it): Observable<ReturnVal> {
                                           
               it.notification.title = this.title;
               it.notification.body = this.body;
               it.notification.image = "https://i.ibb.co/k50xvFL/icon.png"
               
                 return this.http
                  .post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
              }
 
  

  ngOnInit() {

    this.firebaseservice.read_token().subscribe((data)=>{
      this.tokens = data.map((e)=>{
        return {
          id: e.payload.doc.id,
				isEdit: false,
				Token: e.payload.doc.data()['Token'],
        }
      });
      console.log(this.tokens);

    });

    this.firebaseservice.read_token().subscribe((data)=>{
      this.originaltoken = data.map((e)=>{
        return {
          id: e.payload.doc.id,
        isEdit: false,
        Token: e.payload.doc.data()['Token'],
        }
      });
      console.log(this.originaltoken);
  
    });
  }

  
}


