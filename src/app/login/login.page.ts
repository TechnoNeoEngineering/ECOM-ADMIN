import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { FireStoreService } from '../service/fire-store.service';

import * as firebase from 'firebase/app';

import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  email: string;
  uid: string;
  loading: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  LoggedIn: boolean = false;

  userProfile: any = null;

  flag: boolean = false;

  user: any = null;

  public isGoogleLogin = false;

  constructor(

    private navCtrl: NavController,
    private authService: FireStoreService,
    private formBuilder: FormBuilder,

    private platform: Platform,

    public loadingController: LoadingController,
    private fireAuth: AngularFireAuthModule,
    private alertCtrl: AlertController,
    public storage: Storage,
    private firestore: FireStoreService,
    private afAuth: AngularFireAuth,


  ) {


    // var user = JSON.parse(localStorage.getItem('user'));
    // console.log(user.email)



  }


  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  logoutUser() {


    this.storage.remove('email').then(k => {
      this.storage.remove('logged').then(k1 => {
        console.log('LOG Out');
      });
    });

  }

  cre: any[];
  async loginUser(credentials): Promise<void> {
    credentials.email = credentials.email.toLowerCase().trim();
    this.firestore.search('SuperAdmin', '', 'email', '==', credentials.email).subscribe(data => {
      this.cre = data.map(e => {
        return {
          id: e.payload.doc.id,
          UId: e.payload.doc.data()['UId'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
        };
      });
      //  console.log(JSON.stringify(this.cre));
      if (credentials.email === this.cre[0].email.trim() && credentials.password === this.cre[0].password) {
        this.storage.set('logged', 'true');
        this.storage.set('email', this.email);
        this.navCtrl.navigateForward('/home');
      } else {
        alert('Username or Password is wrong')
      }
    });
  }


  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  forgotpassword() {
    this.navCtrl.navigateForward('/forgotpwd');
  }

  phonenumber() {
    this.navCtrl.navigateForward('/mobileotp');
  }


  //   fbSignIn(){
  //     this.fb.login(['email'])
  //     .then((res: FacebookLoginResponse) => {
  //       let credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
  //       firebase.auth().signInWithCredential(credential).then(info=>{
  //         alert(JSON.stringify(info))
  //       })
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }

  // fbSignIn(){
  //   this.fb.login(['email'])
  //       .then((response: FacebookLoginResponse) => {
  //         this.onfbLoginSuccess(response);
  //         console.log(response.authResponse.accessToken);
  //       }).catch((error) => {
  //         console.log(error)
  //         alert('error:' + error)
  //       });
  //   }
  //   onfbLoginSuccess(res: FacebookLoginResponse) {
  //     const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //     firebase.auth().signInWithCredential(credential)
  //       .then((response) => {
  //         console.log(response);
  //         this.navCtrl.navigateRoot('/home');
  //         this.loading.dismiss();
  //       })
  //   }



  // googleSignIn():void {
  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   firebase.auth().signInWithRedirect(provider).then( () => {
  //     firebase.auth().getRedirectResult().then( result => {
  //       // This gives you a Google Access Token.
  //       // You can use it to access the Google API.
  //       var token = result.credential as firebase.auth.OAuthCredential;
  //       // The signed-in user info.
  //       var user = result.user;
  //       console.log(token, user);

  //     }).catch(function(error) {

  //       console.log(error.message);

  //     });
  //   });
  // }

  // googleSignIn(): void {
  // 	const provider = new firebase.auth.GoogleAuthProvider();
  // 	provider.addScope('profile');
  // 	provider.addScope('email');
  // 	firebase
  // 		.auth()
  // 		.signInWithPopup(provider)
  // 		.then((r) => {

  // 			var user = r.user;

  // 			alert(user.providerData[0].email);
  // 			firebase
  // 				.auth()
  // 				.getRedirectResult()
  // 				.then((result) => {
  // 					// This gives you a Google Access Token.
  // 					// You can use it to access the Google API.
  // 					var token = result.credential as firebase.auth.OAuthCredential;
  // 					// The signed-in user info.
  // 					var user = result.user;

  // 					console.log(token, user);
  // 				})
  // 				.catch(function (error) {
  // 					console.log(error.message);
  // 				});
  // 		});
  // }




  // async googleSignIn(){
  //   let params;
  //     if (this.platform.is('android')) {
  //       params = {

  //         'webClientId': '9667800126-p7t01q33tltd3gd7qm35ktk9ppgnpm3t.apps.googleusercontent.com',
  //         'offline': true

  //       }
  //     }

  //     this.google.login(params)
  //       .then((response) => {
  //         const { idToken, accessToken } = response
  //         this.onLoginSuccess(idToken, accessToken);
  //       }).catch((error) => {
  //         console.log(error)
  //         alert('error:' + JSON.stringify(error))
  //       });
  //   }
  //   onLoginSuccess(accessToken, accessSecret) {
  //     const credential = accessSecret ? firebase.auth.GoogleAuthProvider
  //         .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
  //             .credential(accessToken);
  //             firebase.auth().signInWithRedirect(credential)
  //       .then((response) => {
  //         this.navCtrl.navigateRoot('/home');
  //         this.loading.dismiss();
  //       })

  //   }
  //   onLoginError(err) {
  //     console.log(err);
  //   }


  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.afAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user = success.user;
        this.navCtrl.navigateRoot('/home');
        this.loading.dismiss();
      });

  }
  onLoginError(err) {
    this.navCtrl.navigateRoot('/home');
    console.log(err);
  }
}