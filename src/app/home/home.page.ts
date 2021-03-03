import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FireStoreService } from '../service/fire-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import {Chart} from 'node_modules/chart.js'
import { CountUpModule } from 'ngx-countup';
import { InputVal } from '../models/input-val';
import { ReturnVal } from '../models/return-val';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
	createtoken: any;
	base_path = 'https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send';
	originaltoken: { id: string; isEdit: boolean; Token: any; }[];
	title:any;
	body:any;
	inputdata: InputVal;
	outputdata:ReturnVal;
	option = {
	  useEasing: true,
	  duration: 2.5
	}
	// order Count
	orderdetails: any[];
	orderlength: any;

	today: Date;
	totalcountorder: any;
	totalcountcancel: any;
	totalcountreturn: any;

	// specialuserrequest
	RequestForm: any[];
	specialusercount: any;

	// Product Details
	ProductviewList :any[]=[];
	producttotalcount: any;
	lower: any[];
	lowertotal: number;

	constructor(private navCtrl: NavController,private fireStoreService: FireStoreService,
		private firestore: AngularFirestore,public datepipe: DatePipe,countup:CountUpModule,
		private AlertController : AlertController,private http: HttpClient) {this.inputdata = new InputVal();}
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
		this.fireStoreService.read_webtoken().subscribe((data) => {			
			this.createtoken = data.map((e) => {
				console.log(e.payload.doc.data()['Token'])				
				return {   
					id: e.payload.doc.id,
					isEdit: false,
					Token: e.payload.doc.data()['Token']
				}
			});
			console.log(this.createtoken);
    });
		var ctx:any = document.getElementById('myChart');
var myChart = new Chart('myChart', {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {	
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
		this.fireStoreService.read_orderdetails().subscribe((data) => {
			this.orderdetails = data.map((e) => {
				// console.log( e.payload.doc.data()['product_orderdate']);
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
			// this.firestore.doc('CartListtNew133' + '/' + "srm9hnUyIVOpfL2mMFU").delete();
			let today= new Date().toLocaleString();

			let today1 = this.datepipe.transform(today, 'MM/dd/yyyy');
			//  console.log(today1);
			// console.log((this.orderdetails[0]['product_orderdate'].split(","))[0]);
			// var name=this.orderdetails.filter(totalcount =>(totalcount.orderid) == '1609-743086-7221');
			// console.log(name);
			// let date = this.datepipe.transform(this.orderdetails['product_orderdate'], 'MM/dd/yyyy');
			// this.selectedOrderid = this.orderarr.filter(orderarr => this.datepipe.transform(orderarr.product_orderdate, 'MM/dd/yyyy') == orderdate);
			//  && this.datepipe.transform(totalcount.product_orderdate === today1)
			this.totalcountorder = this.orderdetails.filter(totalcount => totalcount.deliverstatus === 'Ordered').length;
			console.log(this.totalcountorder);
			this.totalcountcancel = this.orderdetails.filter(totalcount => totalcount.deliverstatus === 'cancel').length;
			console.log(this.totalcountcancel);
			this.totalcountreturn = this.orderdetails.filter(totalcount => totalcount.deliverstatus === 'returned').length;
			console.log(this.totalcountreturn);

			
		});

		// -------------------------- Special User Request ----------------------------------

		this.fireStoreService.read_specialrequest().subscribe(data => {

			this.RequestForm = data.map(e => {
			  return {
				id: e.payload.doc.id,
				isEdit: false,
				Name: e.payload.doc.data()['name'],
				Email: e.payload.doc.data()['email'],
				Mobile: e.payload.doc.data()['mobile'],
				Address: e.payload.doc.data()['address'],
				Products: e.payload.doc.data()['products'],
				Date: e.payload.doc.data()['date']
			  };
			})
			this.specialusercount = this.RequestForm.length;
		  });


		//  

		this.fireStoreService.read_Productdetails().subscribe(data => {

			this.ProductviewList = data.map(e => {
			  return {
				id: e.payload.doc.id,
				isEdit: false,
				Id: e.payload.doc.data()['Id'],
				SubCategory_id: e.payload.doc.data()['SubCategory_id'],
				Enabled: e.payload.doc.data()['Enabled'],
				Deleted: e.payload.doc.data()['Deleted'],
				Product_name: e.payload.doc.data()['Product_name'],
				Product_id: e.payload.doc.data()['Product_id'],
				sku: e.payload.doc.data()['sku'],
				Star: e.payload.doc.data()['Star'],
				Review: e.payload.doc.data()['Review'],
				// Range: e.payload.doc.data()['Range'],
				stock: e.payload.doc.data()['stock'],
				addstock: e.payload.doc.data()['addstock'],
				Normal_price: e.payload.doc.data()['Normal_price'],
				Price1: e.payload.doc.data()['Price1'],
				Range1_from: e.payload.doc.data()['Range1_from'],
				Range1_to: e.payload.doc.data()['Range1_to'],
				Price2: e.payload.doc.data()['Price2'],
				Range2_from: e.payload.doc.data()['Range2_from'],
				Range2_to: e.payload.doc.data()['Range2_to'],
				Price3: e.payload.doc.data()['Price3'],
				Range3_from: e.payload.doc.data()['Range3_from'],
				Range3_to: e.payload.doc.data()['Range3_to'],
				Price4: e.payload.doc.data()['Price4'],
				Range4_from: e.payload.doc.data()['Range4_from'],
				Range4_to: e.payload.doc.data()['Range4_to'],
				Price5: e.payload.doc.data()['Price5'],
				Range5_from: e.payload.doc.data()['Range5_from'],
				Range5_to: e.payload.doc.data()['Range5_to'],
				Price6: e.payload.doc.data()['Price6'],
				Range6_from: e.payload.doc.data()['Range6_from'],
				Range6_to: e.payload.doc.data()['Range6_to'],
				Price7: e.payload.doc.data()['Price7'],
				Range7_from: e.payload.doc.data()['Range7_from'],
				Range7_to: e.payload.doc.data()['Range7_to'],
				Price8: e.payload.doc.data()['Price8'],
				Range8_from: e.payload.doc.data()['Range8_from'],
				Range8_to: e.payload.doc.data()['Range8_to'],
				Price9: e.payload.doc.data()['Price9'],
				Range9_from: e.payload.doc.data()['Range9_from'],
				Range9_to: e.payload.doc.data()['Range9_to'],
				Price10: e.payload.doc.data()['Price10'],
				Range10_from: e.payload.doc.data()['Range10_from'],
				Range10_to: e.payload.doc.data()['Range10_to'],
				Offer: e.payload.doc.data()['Offer'],
				gst: e.payload.doc.data()['gst'],
				Mrp: e.payload.doc.data()['Mrp'],
				Emi: e.payload.doc.data()['Emi'],
				Key_Features1: e.payload.doc.data()['Key_Features1'],
				Key_Features2: e.payload.doc.data()['Key_Features2'],
				Key_Features3: e.payload.doc.data()['Key_Features3'],
				Key_Features4: e.payload.doc.data()['Key_Features4'],
				Key_Features5: e.payload.doc.data()['Key_Features5'],
				Key_Features6: e.payload.doc.data()['Key_Features6'],
				Cashback1: e.payload.doc.data()['Cashback1'],
				Cashback2: e.payload.doc.data()['Cashback2'],
				Itemdetail_name: e.payload.doc.data()['Itemdetail_name'],
				Category_name: e.payload.doc.data()['Category_name'],
				Category1: e.payload.doc.data()['Category1'],
				Category2: e.payload.doc.data()['Category2'],
				Category3: e.payload.doc.data()['Category3'],
				item_usage: e.payload.doc.data()['item_usage'],
				pack_size: e.payload.doc.data()['pack_size'],
				unit: e.payload.doc.data()['unit'],
				Description_name: e.payload.doc.data()['Description_name'],
				Description: e.payload.doc.data()['Description'],
				Review_name: e.payload.doc.data()['Review_name'],
				Review_des: e.payload.doc.data()['Review_des'],
				Brand: e.payload.doc.data()['Brand'],
				Make: e.payload.doc.data()['Make'],
				Model: e.payload.doc.data()['Model'],
				YearOfManufacture: e.payload.doc.data()['YearOfManufacture'],
				Expiry: e.payload.doc.data()['Expiry'],
				AgeGroup: e.payload.doc.data()['AgeGroup'],
				Weight: e.payload.doc.data()['Weight'],
				Dimensions: e.payload.doc.data()['Dimensions'],
				Url: e.payload.doc.data()['Url'],
				Urlimage_view1: e.payload.doc.data()['Urlimage_view1'],
				Urlimage_view2: e.payload.doc.data()['Urlimage_view2'],
				Urlimage_view3: e.payload.doc.data()['Urlimage_view3'],
				Color: e.payload.doc.data()['Color'],
				composition: e.payload.doc.data()['composition'],
				howtouse: e.payload.doc.data()['howtouse'],
				application: e.payload.doc.data()['application'],
				packagecontents: e.payload.doc.data()['packagecontents']
			  }
			  
			});
			this.producttotalcount = this.ProductviewList.length;

			this.lower = this.ProductviewList.filter(lower => lower.stock < 10);
			this.lowertotal = this.lower.length;
			for(var i=0; i < this.ProductviewList.length; i++){
				if(this.ProductviewList[i].stock < 10){
					//this.send();
				//   this.showalert();
				}
			  }
		
			console.log(this.lower);
			
		});
		  
		
	}
	send(){
		let it = new InputVal();
		for(var i=0;i<this.createtoken.length;i++){
		  it.to = this.createtoken[i]['Token'];
		  console.log(it.to);
		  this.createItem(it).subscribe(t =>{
			console.log(JSON.stringify(t));
		  });      
		 }    
	  }
	  createItem(it): Observable<ReturnVal> {
		var user = localStorage.getItem('email');                               
	   it.notification.title = "Lower Stock";
		it.notification.body = "please add stock"
	   it.notification.image = "https://i.ibb.co/k50xvFL/icon.png"
	   
		 return this.http
		  .post<ReturnVal>(this.base_path, JSON.stringify(it), this.httpOptions)
	  }
	async showalert(){	
		const res = await this.AlertController.create({
	  header: '',
	  subHeader: '',
	  message: 'Stock value are lower',
		  buttons:[  
			{
			  text: 'Check',
			  handler: () => {
				this.navCtrl.navigateForward('/lowerstocks');
			  }
			}]
		});
	  await res.present();
	}

	specialuser() {
		this.navCtrl.navigateForward('/specialuserrequest');
	}

	ordertracking() {
		this.navCtrl.navigateForward('/ordertracking');
	}

	productdetails() {
		this.navCtrl.navigateForward('/viewproduct');
	}

	lowerstock() {
		this.navCtrl.navigateForward('/lowerstocks');
	}
			
}
