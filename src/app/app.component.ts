import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { Storage } from '@ionic/storage';
import { NavParams, NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { PopoverController } from '@ionic/angular';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	rootPage: any = 'viewproduct';
	
	constructor(private platform: Platform, private splashScreen: SplashScreen,public popoverCtrl: PopoverController,
		private statusBar: StatusBar,private http:HTTP, public nav: NavController, public navParams: NavParams, 
		private storage: Storage,private route: ActivatedRoute) {

		this.initializeApp();	
	}

	initializeApp() {
		this.platform.ready().then(() => {
			firebase.initializeApp(environment.firebaseConfig);
			this.http.setServerTrustMode('pinned'); 
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	blink(ev:any){
		ev.target.classList.add('class3'); // To ADD
		ev.target.classList.remove('animate__heartBeat'); // To Remove
		ev.target.classList.contains('animate__animated animate__heartBeat'); // To check
		ev.target.classList.toggle('class4'); // To toggle
	}
	async notifications(ev:any) {  	
		const popover = await this.popoverCtrl.create({  
			component: NotificationsComponent,  
			event: ev,  
			animated: true,  
			showBackdrop: false  
		});  
		return await popover.present();  

	}  

	push(){
		this.nav.navigateForward('/pushnotification')
	}

	Home() {
		this.nav.navigateForward('/home');
	}

	Productpage() {
		this.nav.navigateForward('/admin');
	}

	Categorypage() {
		this.nav.navigateForward('/category');
	}

	viewpage() {
		this.nav.navigateForward('/view');
	}

	Viewproduct() {
		this.nav.navigateForward('/viewproduct');
	}

	stockdetails() {
		this.nav.navigateForward('/stockdetails');
	}

	deliverycharge() {
		this.nav.navigateForward('/delivery-charges');
	}

	Productrecovery() {
		this.nav.navigateForward('/productrecovery');
	}

	Specialuserrequest() {
		this.nav.navigateForward('/specialuserrequest');
	}

	Specialuser() {
		this.nav.navigateForward('/specialuser');
	}

	discountdetails() {
		this.nav.navigateForward('/discountdetails');
	}
	
	ordertracking() {
		this.nav.navigateForward('/ordertracking');
	}

	queries() {
		this.nav.navigateForward('/queries');
	}

	gst() {
		this.nav.navigateForward('/gst');
	}

	banner() {
		this.nav.navigateForward('/banner');
	}

	offers(){
		this.nav.navigateForward('/offers');
	}

	// invoicebill() {
	// 	this.nav.navigateForward('/invoice-bill');
	// }
	
	Logout() {
		this.storage.remove('email').then(k => {
			this.storage.remove('logged').then(k1 => {
				console.log('LOG Out');
				this.nav.navigateRoot('/login');
			});
		});
	}
}
