import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [], 
  imports:[BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFirestoreModule,
   DemoMaterialModule,
   HttpClientModule,
   BrowserAnimationsModule],
  providers: [SplashScreen,StatusBar,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FCM,FingerprintAIO],
  bootstrap: [AppComponent],
})
export class AppModule {}
