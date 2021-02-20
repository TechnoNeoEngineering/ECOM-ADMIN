import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cancelpage',
  templateUrl: './cancelpage.page.html',
  styleUrls: ['./cancelpage.page.scss'],
})
export class CancelpagePage implements OnInit {

  return: string = 'Incompleted';

  selectedOrderid: any[];
  orderdropdown: any[] = [];
  orderdetails: any = [];
  userid: string;
  totalcount: number;
  ProductviewList: any;
  selectcancelprdt: any[];

  stockdet: any;
  stockdetails: any;

  constructor(private fireStoreService: FireStoreService,
    private firestore: AngularFirestore, private toastcontroller: ToastController,
    public nav: NavController) { }

    read_Productdetails() {
      return this.firestore.collection('viewProducts_Table').snapshotChanges();
    }

  ngOnInit() {
  }

  ionViewWillEnter(){

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
          stockadded: e.payload.doc.data()['stockadded']
        };
      });
      console.log(this.orderdetails);
      this.selectedOrderid = this.orderdetails.filter(cre => cre.deliverstatus == "cancel");
      console.log(this.selectedOrderid);
      // this.selectcancelprdt = this.selectedOrderid;
    });

    this.read_Productdetails().subscribe(data => {

      this.ProductviewList = data.map(e => {
        return {
          id: e.payload.doc.id,
          Product_name: e.payload.doc.data()['Product_name'],
          Product_id: e.payload.doc.data()['Product_id'],
          stock: e.payload.doc.data()['stock'],
        }
      });
      console.log(this.ProductviewList);
      for (var j = 0; j < this.ProductviewList.length; j++) {
        for (var i = 0; i < this.orderdetails.length; i++) {
          if (this.orderdetails[i]['Productid'] == this.ProductviewList[j]['Product_id']) {
            this.orderdetails[i]['Description'] = this.ProductviewList[j]['Product_name']
            // console.log(this.orderdetails);
          }
        }
      }

    });

  }

  verifyEvent(Productid, orderid, Quantity,id) {
    console.log(Productid, orderid, Quantity,id);
    console.log(id);

    const name1 = {
      Product_id: Productid,
      order_id: orderid,
      Quantity: Quantity,
      id: id,
    };

    this.selectcancelprdt = JSON.parse(localStorage.getItem('cancelprdt')) || [];

    let productValues = this.selectcancelprdt.findIndex((eachProduct) => eachProduct.Product_id == Productid && eachProduct.order_id == orderid);

    if (productValues < 0) {
      //if productid not matched
      this.selectcancelprdt.push(name1);
      localStorage.setItem('cancelprdt', JSON.stringify(this.selectcancelprdt));
      // this.first = 0;
      // this.drawn = false;
      // console.log(name1);
    } else {
      //id productid and orderid matched
      console.log('already exist');
      var cancelfavr = JSON.parse(localStorage.getItem('cancelprdt'));

      if (productValues >= -1) {
        cancelfavr.splice(productValues, 1);

        localStorage.setItem('cancelprdt', JSON.stringify(cancelfavr));
        console.log(cancelfavr);
      }
    }
  }

  submit() {
    this.stockdet = JSON.parse(localStorage.getItem('cancelprdt'));
    console.log(this.stockdet);
    console.log(this.selectcancelprdt);
    for (var p = 0; p < this.stockdet.length; p++) {
      for (var s = 0; s < this.ProductviewList.length; s++) {
        if (this.ProductviewList[s]['Product_id'] == this.stockdet[p]['Product_id']) {
          this.stockdetails = this.ProductviewList[s].stock + this.stockdet[p].Quantity;
          this.firestore.collection('viewProducts_Table').doc(this.ProductviewList[s].id).update({
            stock: this.stockdetails
          });
          this.firestore.collection('orderdetails').doc(this.stockdet[p].id).update({
            stockadded: 'StockAdded'
          });
          // console.log(stockadded)
          console.log(this.selectedOrderid);
        }
      }
    }
  }

}
