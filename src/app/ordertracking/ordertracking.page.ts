import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.page.html',
  styleUrls: ['./ordertracking.page.scss'],
})

export class OrdertrackingPage implements OnInit {
  base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
  data: InputVal;
  outputdata:ReturnVal;
  orderdetails: any[];
  cre: any[];
  order: string = "All";
  orderarr: any;
  orderdate: any;
  mnts: any;
  shipid: any;
  orderid : any;
  ordercount: boolean;
  totalcount: number;
  selectedOrderid: any[];
  orderdropdown: any[] = [];
  unique_orderid: any[] = [];
  orderlength: any;
  useridtokens: any;
  userid: string;

  ODID: any;

  constructor(private fireStoreService: FireStoreService,
    private firestore: AngularFirestore,
    public nav: NavController,
    public datepipe: DatePipe,
    private http: HttpClient) { }
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

    
    // createItem(it,product): Observable<ReturnVal> {
    //   it.notification.title = 'Your Order is InProgress';
    //   it.notification.body = product;
        //  it.notification.image = image; 
    //    return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
          
    // }
    itempacked(it,product,image): Observable<ReturnVal> {
      it.notification.title =  'Your Order is Packed';  
      it.notification.body = product;
      it.notification.image = image;
       return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
          
    }
    itemshipped(it,product,image): Observable<ReturnVal> {
      it.notification.title = 'Your Order is Shipped' ;
      it.notification.body = product;
      it.notification.image = image;
       return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
          
    }
    itemdelivered(it,product,image): Observable<ReturnVal> {
      it.notification.title = 'Your Order Has been Deliverd' ;
      it.notification.body = product ;
      it.notification.image = image;
       return this.http.post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
          
    }

  read_cart() {
    return this.firestore.collection('CartListtNew133').snapshotChanges();
  }

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

      var use = localStorage.getItem('userid');
      this.userid = use;

    this.fireStoreService.read_orderdetails().subscribe((data) => {
      this.orderdetails = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userid: e.payload.doc.data()['userid'],
          Productid: e.payload.doc.data()['Productid'],
          Quantity: e.payload.doc.data()['Quantity'],
          Price: e.payload.doc.data()['Price'],
          totalamount: e.payload.doc.data()['totalamount'],
          product_orderdate: e.payload.doc.data()['product_orderdate'],
          image: e.payload.doc.data()['image'],
          address: e.payload.doc.data()['address'],
          phoneno: e.payload.doc.data()['phoneno'],
          orderid: e.payload.doc.data()['orderid'],
          paymentid: e.payload.doc.data()['paymentid'],
          shipmentid: e.payload.doc.data()['shipmentid'],
          shipmentdate: e.payload.doc.data()['shipmentdate'],
          paymentdetails: e.payload.doc.data()['paymentdetails'],
          paymentstatus: e.payload.doc.data()['paymentstatus'],
          trackmentid: e.payload.doc.data()['trackmentid'],
          deliverstatus: e.payload.doc.data()['deliverstatus'],
          deliverdate: e.payload.doc.data()['deliverdate'],
          returnstatus: e.payload.doc.data()['returnstatus'],
          returndate: e.payload.doc.data()['returndate'],
          deliveraddress: e.payload.doc.data()['deliveraddress']
        };
      });
      this.selectedOrderid = this.orderdetails;
      this.totalcount = this.selectedOrderid.length;
      console.log(this.orderdetails);
      for (var i = 0; i < this.orderdetails.length; i++) {
        this.orderdropdown.push(this.orderdetails[i]['orderid']);
      }
      this.unique_orderid = this.orderdropdown.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.orderlength = this.orderdetails.filter(totalcount => totalcount.deliverstatus === 'Ordered').length;
      console.log(this.unique_orderid);
      this.firestore.doc('orderdetails' + '/' + 'id').delete();
      // this.firestore.doc('CartListtNew133' + '/' + "srm9hnUyIVOpfL2mMFU").delete();
    });

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    this.read_Productdetails().subscribe(data => {

      this.ProductviewList = data.map(e => {
        return {
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id'],
        }
      });
        for (var j = 0; j < this.ProductviewList.length; j++) {
          for (var i = 0; i < this.orderdetails.length; i++) {
            if (this.orderdetails[i]['Productid'] == this.ProductviewList[j]['Product_id']) {
              this.orderdetails[i]['Description'] = this.ProductviewList[j]['Product_name']
            }
          }
        }
    });
    
    this.read_cartlist().subscribe((data) => {
      this.cre = data.map((e) => {
        // if((e.payload.doc.data()['product_orderdate']) != null){
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userid: e.payload.doc.data()['userid'],
          Productid: e.payload.doc.data()['Productid'],
          Description: e.payload.doc.data()['Description'],
          Quantity: e.payload.doc.data()['Quantity'],
          Price: e.payload.doc.data()['Price'],
          product_orderdate: e.payload.doc.data()['product_orderdate'],
          image: e.payload.doc.data()['image']
        }
        // }
      });
      console.log(this.cre);
      // this.orderarr=this.cre.filter(function(item){
      //       return item != undefined;         
      //     });
      this.orderarr = this.cre.filter(cre => cre.product_orderdate != null);
      console.log(this.orderarr);
      if (this.orderarr == '') {
        this.ordercount = true;
      }
      else {
        this.ordercount = false;
      }
      console.log(this.orderarr);
    });

    this.mnts = localStorage.getItem('months');
  }

  read_cartlist() {
    const user = localStorage.getItem('email');
    console.log(user);
    return this.firestore.collection('CartListtNew133').snapshotChanges();
    // return this.firestore.collection('CartListtNew133',(ref) => ref.where('userid', '==',user).where('product_orderdate', '==',null)).snapshotChanges();
    // && ref.where('product_orderdate', '!=',null)
  }
  read_Productdetails() {
    return this.firestore.collection('viewProducts_Table').snapshotChanges();
  }
  ProductviewList: any;
  // ngOnInit() {
  // }

  inprogress(data) {
    let record = {}
    record['deliverstatus'] = 'In Progress';
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
    console.log(data);
   var user = data.userid;   
  //  alert(user)
   var product = data.Description;
  //  alert(product)
  //  alert(data.id)
  //  this.send(user,product);
 }

  packed(data) {
    let record = {}
    record['deliverstatus'] = 'Packed';
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
   
    var user = data.userid;  
    // alert(user) 
    var product = data.Description;
  //  alert(product)
   var image = data.image
   this.sendpacked(user,product,image);
  }

  shipped(data) {
    let record = {}
    record['deliverstatus'] = 'Shipped';
    record['shipmentid'] = this.shipid;
    record['shipmentdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
   
    var user = data.userid;  
    // alert(user) 
    var product = data.Description;
    var image =data.image
    this.sendshipped(user,product,image)
    
  }

  delivered(data) {
    let record = {}
    record['deliverstatus'] = 'Delivered';
    record['deliverdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
   
    var user = data.userid;  
    // alert(user) 
    var product = data.Description;
    var image = data.image
    this.senddeliverd(user,product,image)
  }


  placed(mth) {
    localStorage.setItem('months', mth);
  }
  order_track() {
    this.nav.navigateForward('/ordertrack');
  }
  setOrderDateValues(orderdate) {
    let orderdate1 = orderdate.toLocaleString();
    orderdate = this.datepipe.transform(orderdate1, 'MM/dd/yyyy');
    // alert(orderdate);
    this.selectedOrderid = this.orderdetails.filter(orderarr => this.datepipe.transform(orderarr.product_orderdate, 'MM/dd/yyyy') == orderdate);
    this.totalcount = this.selectedOrderid.length;
    console.log(this.selectedOrderid);
  }
  itemcount(event: any) {
    var count = event.detail.value;
    if (event.detail.value != 'All') {
      var selectedOrder = this.orderdetails.filter(orderarr => orderarr.deliverstatus == count);
      this.totalcount = selectedOrder.length;
    }
    else {
      this.totalcount = this.selectedOrderid.length;
    }
  }
  setOrderIdValues(unique_orderid) {
    // alert(unique_orderid);
    if (unique_orderid == 'all') {
      this.selectedOrderid = this.orderdetails;
      this.totalcount = this.selectedOrderid.length;
    }
    else {
      this.selectedOrderid = this.orderdetails.filter(orderarr => orderarr.orderid === unique_orderid);
      this.totalcount = this.selectedOrderid.length;
    }
  }
  // send(user,product){
  //   var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
  //   console.log(tok);
  //   let it = new InputVal();
  //              let found =false;
  //             for(var i=0;i<tok.length;i++){
  //               it.to = tok[i].token;
  //             // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
  //               console.log(it.to);
  //               this.createItem(it,product).subscribe(t =>{
  //                 console.log(JSON.stringify(t));
                  
  //               });
                
  //             }
  // }
  sendpacked(user,product,image){
    var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
    console.log(tok);
    let it = new InputVal();
               let found =false;
              for(var i=0;i<tok.length;i++){
                it.to = tok[i].token;
              // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
                console.log(it.to);
                this.itempacked(it,product,image).subscribe(t =>{
                  console.log(JSON.stringify(t));
                  
                });
                
              }
  }
  sendshipped(user,product,image){
    var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
    console.log(tok);
    let it = new InputVal();
               let found =false;
              for(var i=0;i<tok.length;i++){
                it.to = tok[i].token;
              // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
                console.log(it.to);
                this.itemshipped(it,product,image).subscribe(t =>{
                  console.log(JSON.stringify(t));
                  
                });
                
              }
  }
  senddeliverd(user,product,image){
    var tok = this.useridtokens.filter(usertoken=>usertoken.userid === user);
    console.log(tok);
    let it = new InputVal();
               let found =false;
              for(var i=0;i<tok.length;i++){
                it.to = tok[i].token;
              // it.to ='cY9HirPsaJU:APA91bHiqRGH-Z6nC8yi0UiYlMqA43Z2_70So23Za1CNdRWvTQ5TpEA83LtCzuZ8qc2Oz5PbTnvdYFo_rFzPjxRO7VYcpCGaD5EIQEpwyxUkxm_fY_QXj8dlQYsPdeZkZuv-o36WQoLy'
                console.log(it.to);
                this.itemdelivered(it,product,image).subscribe(t =>{
                  console.log(JSON.stringify(t));
                  
                });
                
              }
  }

  invoice(orderdata){
    console.log(orderdata);
    this.nav.navigateForward('/invoice-bill');
    localStorage.setItem('orderdata',JSON.stringify(orderdata));
  }

  

  

}