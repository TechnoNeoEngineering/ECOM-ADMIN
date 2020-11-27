import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.page.html',
  styleUrls: ['./ordertracking.page.scss'],
})

export class OrdertrackingPage implements OnInit {
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

  constructor(private fireStoreService: FireStoreService,
    private firestore: AngularFirestore,
    public nav: NavController,
    public datepipe: DatePipe) { }

  read_cart() {
    return this.firestore.collection('CartListtNew133').snapshotChanges();
  }

  ngOnInit() {
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
      console.log(this.unique_orderid);
      // this.firestore.doc('CartListtNew133' + '/' + "ZTQmGSza7nWfS9fv3vUi").delete();
      // this.firestore.doc('CartListtNew133' + '/' + "h18KL6y3wc6bGs1TLjHL").delete();
      // this.firestore.doc('CartListtNew133' + '/' + "hfOcRUDahGNwgLy23OXC").delete();
      // this.firestore.doc('CartListtNew133' + '/' + "om3qGsNwKCQfpHWXDO5S").delete();
      // this.firestore.doc('CartListtNew133' + '/' + "rHUtKGqRxVvviAVgAjpe").delete();
      // this.firestore.doc('CartListtNew133' + '/' + "TVgBvJFNRkjDNB25E2tV").delete();
      // this.firestore.doc('orderdetails' + '/' + '2O7feGnwewUVTGe7MI4O').delete();
      // this.firestore.doc('orderdetails' + '/' + 'GcuBWRPghEx4UitWGGLx').delete();
      // this.firestore.doc('orderdetails' + '/' + 'IIJ3iBmkOKARooiehdn1').delete();
      // this.firestore.doc('orderdetails' + '/' + 'iSh782jkvwjrmhjjt3v6').delete();
      // this.firestore.doc('orderdetails' + '/' + 'p06BHamonrGWhYOEY91g').delete();
      // this.firestore.doc('orderdetails' + '/' + 'rXeWO36j5X8xPavLKn5g').delete();
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
    this.firestore.doc('orderdetails' + '/' + data).update(record);
    alert(data);
  }

  packed(data) {
    let record = {}
    record['deliverstatus'] = 'Packed';
    this.firestore.doc('orderdetails' + '/' + data).update(record);
    alert(data);
  }

  shipped(data) {
    let record = {}
    record['deliverstatus'] = 'Shipped';
    record['shipmentid'] = this.shipid;
    record['shipmentdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data).update(record);
    alert(data);
  }

  delivered(data) {
    let record = {}
    record['deliverstatus'] = 'Delivered';
    record['deliverdate'] = new Date().toLocaleString();
    this.firestore.doc('orderdetails' + '/' + data).update(record);
    alert(data);
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
    alert(orderdate);
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
    alert(unique_orderid);
    if (unique_orderid == 'all') {
      this.selectedOrderid = this.orderdetails;
      this.totalcount = this.selectedOrderid.length;
    }
    else {
      this.selectedOrderid = this.orderdetails.filter(orderarr => orderarr.orderid === unique_orderid);
      this.totalcount = this.selectedOrderid.length;
    }
  }
}