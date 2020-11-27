import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { Storage } from '@ionic/storage';
import { NavParams, NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	rootPage: any = 'viewproduct';

	constructor(private platform: Platform, private splashScreen: SplashScreen,
		private statusBar: StatusBar,private http:HTTP, public nav: NavController, public navParams: NavParams, private storage: Storage) {
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

	push(){
		this.nav.navigateForward('/pushnotification')
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

	Productrecovery() {
		this.nav.navigateForward('/productrecovery');
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
	
	Logout() {
		this.storage.remove('email').then(k => {
			this.storage.remove('logged').then(k1 => {
				console.log('LOG Out');
				this.nav.navigateRoot('/login');
			});
		});
	}
}
