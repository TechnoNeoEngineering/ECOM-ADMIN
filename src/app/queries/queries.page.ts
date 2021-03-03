import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.page.html',
  styleUrls: ['./queries.page.scss'],
})
export class QueriesPage implements OnInit {

  queries: string = 'question';
  queryForm: FormGroup;
  queryList: any;
  answer: any;
  base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
  data: InputVal;
  outputdata:ReturnVal;
  useridtokens: any;
  constructor(private fireStoreService: FireStoreService,private firestore: AngularFirestore,
    public fb: FormBuilder , private afauth:AngularFirestore,private http: HttpClient) { }
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

    // this.queryForm = this.fb.group({
    //   answer: ['', [Validators.required]]
		// })
    this.fireStoreService.read_useridToken().subscribe((data)=>{
      this.useridtokens = data.map((e)=>{
        return {
        id: e.payload.doc.id,
				isEdit: false,
        userid: e.payload.doc.data()['userid'],
        token: e.payload.doc.data()['token'],
        }
      });
        console.log(this.useridtokens);
        // this.firestore.doc('useridToken'+ '/' + 'fUUCVV6issHf7Q1ax8b2').delete();
    });
    this.fireStoreService.read_Query().subscribe(data => {
			this.queryList = data.map(e => {
				return {
					id: e.payload.doc.id,
					isEdit: false,
					userid: e.payload.doc.data()['userid'],
					query: e.payload.doc.data()['query'],
          Product_id: e.payload.doc.data()['Product_id'],
          answer: e.payload.doc.data()['answer']
				};
			});
			console.log(this.queryList);
		});

  }

  update(query,user) {
    
    //alert(this.answer);
		this.firestore.collection('Query').doc(query.id).update({
      answer: this.answer
    });
    this.sendquery(user);    
    console.log(query);
    // alert(row);
  }
  // read_Query(){
  //   return this.afauth.collection('Query',(ref)=>ref.where('answer','==','undefined')).snapshotChanges();
  // }
  sendquery(user){
    var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
    console.log(tok);
    let it = new InputVal();
               let found =false;
              for(var i=0;i<tok.length;i++){
                it.to = tok[i].token;
              // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
                console.log(it.to);
                this.queryanswered(it).subscribe(t =>{
                  console.log(JSON.stringify(t));
                });
              }
            }
            queryanswered(it): Observable<ReturnVal> {
              it.notification.title = 'Seller answered your query!' ;
              it.notification.body = this.answer ;
              it.notification.image = "https://i.ibb.co/k50xvFL/icon.png";
               return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)          
            }
  RemoveRecord(rowID) {
    // alert("Delete Disabled");
    console.log(rowID);
    this.fireStoreService.delete_Query(rowID);
  }
}