import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


//plugins
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from "@ionic-native/facebook";

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//servicios
import { UsuarioProvider } from '../providers/usuario/usuario';

export const firebaseConfig = {
  apiKey: "AIzaSyAGYctDR0t5x_bs-A1VpWvvU80nLPesjZU",
  authDomain: "angular-a7101.firebaseapp.com",
  databaseURL: "https://angular-a7101.firebaseio.com",
  projectId: "angular-a7101",
  storageBucket: "angular-a7101.appspot.com",
  messagingSenderId: "783899450461"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider
  ]
})
export class AppModule {}
