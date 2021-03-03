import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Platform,AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-specialuserrequest',
  templateUrl: './specialuserrequest.page.html',
  styleUrls: ['./specialuserrequest.page.scss'],
})
export class SpecialuserrequestPage implements OnInit {
  type='newrequest';
  RequestForm1: any;

  user: any;
  gst:any;
  reqstatus:any;
  specialuserForm: FormGroup;
  base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
  useridtokens:any[];
  title:any;
  body:any;  
  inputdata: InputVal;
  outputdata:ReturnVal;
  constructor(private fireStoreService: FireStoreService,private firestore: AngularFirestore,
    public fb: FormBuilder,private AlertController: AlertController,
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
  ngOnInit() {
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
    //  this.fireStoreService.delete_specialrequest("Dzb3xIsPdez7r23V2goc");
    this.specialuserForm = this.fb.group({
      user_id: this.user,
      include_gst:this.gst,
      list: [[]],
    });

    this.fireStoreService.read_specialrequest().subscribe(data => {

      this.RequestForm1 = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Email: e.payload.doc.data()['email'],
          Mobile: e.payload.doc.data()['mobile'],
          Address: e.payload.doc.data()['address'],
          Products: e.payload.doc.data()['products'],
          Date: e.payload.doc.data()['date'],
          Special_user: e.payload.doc.data()['Special_user'],
          request: e.payload.doc.data()['request'],
          userid: e.payload.doc.data()['userid'],
          layer1confirmation:e.payload.doc.data()['layer1confirmation'],
          layer2confirmation:e.payload.doc.data()['layer2confirmation'],
        };
      })
      console.log(this.RequestForm1);

      // var prod = JSON.stringify(this.RequestForm1.Products);
      // console.log(prod);
    });
  }

    async accept(special) {      
      const alert = await this.AlertController.create({
        header: "Are you sure? Accept Specialuer",
        inputs: [
          {
            // name: special.Email,
            type: 'radio',
            label: special.Email,
            value: special.Email,
            checked: true
          },
          {
            // name:special.Mobile ,
            type: 'radio',
            label: special.Mobile,
            value: special.Mobile,
          },
        ],
        buttons: [
          {
            text:"cancel",
            handler: () => {
              console.log('Confirm cancel');
            }
          },
          {
            text: 'Okay',
              handler: (special1) => {
                console.log(special1);
                // this.reqstatus="createdspecial";
                this.firestore.doc('Specialuserrequest' + '/' + special.id).update({
                  request : "createdspecial",
                  
                })
                console.log(special1);
                this.user = special1;
                this.gst = false;
                this.specialuserForm = this.fb.group({
                  user_id: this.user,
                  include_gst:this.gst,
                  list: [[]],
                });
                this.CreateRecord();
               // this.send(special.user);
                console.log(special.user);
            }
          }
        ]
      });
      await alert.present();
    }
  

  async decline(rowID) {
    const alert = await this.AlertController.create({
      header: "Are you sure? If you want delete",
      buttons: [
        {
          text:"cancel",
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Okay',
            handler: () => {
              this.firestore.doc('Specialuserrequest' + '/' + rowID).update({
                request : "declinedrequest",
                 })
              // this.fireStoreService.delete_specialrequest(rowID);
              console.log("hi");
          }
        }
      ]
    });
    await alert.present();
  }
  send(user){
  var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
  console.log(tok);
  let it = new InputVal();
             let found =false;
            for(var i=0;i<tok.length;i++){
              it.to = tok[i].token;
            // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
              console.log(it.to);
              this.itemshipped(it).subscribe(t =>{
                console.log(JSON.stringify(t));                  
              });               
            }
          }
          itemshipped(it): Observable<ReturnVal> {
            it.notification.title = 'Yehhhh!' ;
            it.notification.body = "You'r a Special user now!";
            it.notification.image = "https://i.ibb.co/k50xvFL/icon.png"
             return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)          
          }
  CreateRecord() {

    console.log(this.specialuserForm.value);
    this.fireStoreService.create_userspecial(this.specialuserForm.value).then(resp => {
      // alert(this.user);
    })
    .catch(error => {
      console.log(error);
    });
  }


}
