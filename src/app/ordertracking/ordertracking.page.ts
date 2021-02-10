import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController,ToastController, AlertController } from '@ionic/angular';
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
  orderdetails: any=[];
  cre: any[];
  order: string = "All";
  orderarr: any;
  orderdate: any;
  orderdate1: any;
  mnts: any;
  shipid: any;
  orderid : any = "all";
  ordercount: boolean;
  totalcount: number;
  selectedOrderid: any[];
  orderdropdown: any[] = [];
  unique_orderid: any[] = [];
  orderlength: any;
  useridtokens: any;
  userid: string;

  ODID: any;
  invo: any;
  districtval: any;
  districtwise: any=[];

  districtwiseorderid: any = "all";

  pincodewiseorderid: any ="all";
  pincodewise: any=[];
  pincodeval: any;

  specialuserList:any = [];
  usersplit: any = [];
  userspecialid: any;
  specailid: any = "all";

  constructor(private fireStoreService: FireStoreService,
    private firestore: AngularFirestore,private toastcontroller : ToastController,
    public nav: NavController,private AlertController: AlertController,
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
          packingdate: e.payload.doc.data()['packingdate'],
          paymentdetails: e.payload.doc.data()['paymentdetails'],
          paymentstatus: e.payload.doc.data()['paymentstatus'],
          trackmentid: e.payload.doc.data()['trackmentid'],
          deliverstatus: e.payload.doc.data()['deliverstatus'],
          deliverdate: e.payload.doc.data()['deliverdate'],
          returnstatus: e.payload.doc.data()['returnstatus'],
          returndate: e.payload.doc.data()['returndate'],
          deliveraddress: e.payload.doc.data()['deliveraddress'],
          billingaddress: e.payload.doc.data()['billingaddress'],
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
      // this.firestore.doc('CartListtNew133' + '/' + "srm9hnUyIVOpfL2mMFU").delete();

      var districtvalue = [];
      for(var d=0; d < this.orderdetails.length; d++){
        districtvalue.push(this.orderdetails[d]['deliveraddress']['addr_district']);
      }
      console.log(districtvalue);
      this.districtwise = districtvalue.filter((a, b) => districtvalue.indexOf(a) === b);
      console.log(this.districtwise);

      var pincodvalue = [];
      for(var p=0; p < this.orderdetails.length; p++){
        pincodvalue.push(this.orderdetails[p]['deliveraddress']['addr_pincode']);
      }
      console.log(pincodvalue);
      this.pincodewise = pincodvalue.filter((a, b) => pincodvalue.indexOf(a) === b);
      console.log(this.pincodewise);
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

    // special user

    this.fireStoreService.read_userspecial().subscribe(data => {

      this.specialuserList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          user_id: e.payload.doc.data()['user_id'],
          include_gst: e.payload.doc.data()['include_gst'],
          list: e.payload.doc.data()['list'],
        };
      })
      console.log(this.specialuserList);
      // var usersplitph = [];
      for(var s=0; s < this.specialuserList.length; s++){
        this.usersplit.push(this.specialuserList[s]['user_id']);
      }
      console.log(this.usersplit);
      // this.usersplit = usersplitph.filter((a, b) => usersplitph.indexOf(a) === b);
      // console.log(this.usersplit);
    });
    
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

  // invoice(){
  //   // console.log(orderdata);
  //    this.nav.navigateForward('/invoice-bill');
  //   // localStorage.setItem('orderdata',JSON.stringify(orderdata));
  // }

  inprogress(data) {
    // this.invo = JSON.parse(localStorage.getItem('orderdata'));
    
    this.invoice(data);  
    
  //  var user = data.userid;   
  // //  alert(user)
  //  var product = data.Description;
  //  alert(product)
  //  alert(data.id)
  //  this.send(user,product);
 }

  packed(data,i) {
    this.showtoast('Item packed Sucessfully');
    let record = {}
    record['deliverstatus'] = 'Packed';
    record['packingdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
    var user = data.userid;  
    // alert(user) 
    var product = data.Description;
  //  alert(product)
   var image = data.image
   this.sendpacked(user,product,image);
  }

  shipped(data,shipid) {
    this.showtoast('Item Shipped Sucessfully');
    let record = {}
    record['deliverstatus'] = 'Shipped';
    record['shipmentid'] = shipid;
    record['shipmentdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data.id).update(record);
   
    var user = data.userid;  
    // alert(user) 
    var product = data.Description;
    var image =data.image
    this.sendshipped(user,product,image)
  }

  delivered(data) {
    this.showtoast('Item Delivery Sucessfully');
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

  setOrderDateValues() {
    // let orderdate2 = orderdate.toLocaleString();
    this.selectedOrderid = this.orderdetails;
    var order1 = this.datepipe.transform(this.orderdate, 'M/d/yyyy');
    var  order2 = this.datepipe.transform(this.orderdate1, 'M/d/yyyy');
    if(order2 == null){
      let currentdate = new Date();
      order2 = this.datepipe.transform(currentdate, 'M/d/yyyy');
    }
    else{
      order2 = this.datepipe.transform(this.orderdate1, 'M/d/yyyy');
    }
    // alert(order1);
    this.selectedOrderid = this.orderdetails.filter((res)=>{
    return res.product_orderdate.split(',')[0] >= order1 && res.product_orderdate.split(',')[0] <=order2;
      //  console.log(res.product_orderdate.split(',')[0])
    });
    
    // this.orderdetails.filter(orderarr => this.datepipe.transform(orderarr.product_orderdate, 'MM/dd/yyyy') == orderdate);
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

  async invoice(data) {
    const alert = await this.AlertController.create({
      header: 'Do you want to move?',
     
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Invoice',
          handler: () => {
            this.showtoast('Item Inprogress Sucessfully');
            localStorage.setItem('orderdata',JSON.stringify(data));
            // console.log(this.invo);
            this.nav.navigateForward('/invoice-bill');
            let record = {}
            record['deliverstatus'] = 'In Progress';
            this.firestore.doc('orderdetails' + '/' + data.id).update(record);
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async showtoast(message:string){
    const res = await this.toastcontroller.create({
      message,
      position:'bottom',
      duration:1000
   
    });
    await res.present();   
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  district(districtval){
    console.log(districtval);
    // alert(districtval);

    if (districtval == 'all') {
      this.selectedOrderid = this.orderdetails;
      console.log(this.orderdetails);
    }
    else{
      for(var d=0; d < this.orderdetails.length; d++){
        this.selectedOrderid = this.orderdetails.filter(dis => dis.deliveraddress.addr_district == districtval);
      } 
    }
  }

  pincode(pincodeval){
    console.log(pincodeval);
    // alert(districtval);

    if (pincodeval == 'all') {
      this.selectedOrderid = this.orderdetails;
      console.log(this.orderdetails);
    }
    else{
      for(var p=0; p < this.orderdetails.length; p++){
        this.selectedOrderid = this.orderdetails.filter(dis => dis.deliveraddress.addr_pincode == pincodeval);
      } 
    }
  }

  userspecial(userspecialid) {
    console.log(userspecialid);

    if (userspecialid == 'all') {
      this.selectedOrderid = this.orderdetails;
      console.log(this.selectedOrderid);
    }
    else if(userspecialid == 'special'){
      for(var o=0; o < this.orderdetails.length; o++){
        for(var s=0; s < this.specialuserList.length;s++){
          if(this.orderdetails[o]['userid']==this.specialuserList[s]['user_id']  ){
            this.orderdetails[o]['special']="special";
          }
        }
      }
      // console.log(this.selectedOrderid);
      this.selectedOrderid=this.orderdetails.filter(cre => cre.special == "special");
        console.log(this.selectedOrderid);
    }
    else if(userspecialid == 'normal'){
      this.selectedOrderid=this.orderdetails;
      // console.log(this.selectedOrderid);
      for(var o=0; o < this.selectedOrderid.length; o++){
        for(var s=0; s < this.specialuserList.length;s++){
            this.selectedOrderid=this.selectedOrderid.filter(cre => cre.userid != this.specialuserList[s]['user_id']);
            // console.log(this.selectedOrderid);
        }
        console.log(this.selectedOrderid);
      }
    
    }
  }
}
