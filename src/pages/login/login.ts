import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UsuarioProvider } from "../../providers/usuario/usuario";
import { HomePage } from '../home/home';

import { Facebook } from '@ionic-native/facebook';

import { GooglePlus } from '@ionic-native/google-plus';

// @IonicPage()
@Component({
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _up:UsuarioProvider,
              private platform:Platform,
              private fb:Facebook,
              private googlePlus: GooglePlus,
              private alertCtrl:AlertController,
              private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInWithFacebook() {

    if (this.platform.is('cordova')) {
      //movil
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then( user => {
          console.log(res);
          this._up.cargar_usuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          );
          this.navCtrl.setRoot(HomePage );
        }).catch( e => console.log("Error al iniciar sesion", JSON.stringify(e) ));
      })
    }else{
      //desktop
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          let user = res.user;
          this._up.cargar_usuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          );
          this.navCtrl.setRoot(HomePage );
        });
      }
    }

    signInGoogle(){
      this.googlePlus.login({
        'webClientId': '783899450461-2h2o23f6t1p4bpio1ioe5cdce4178e0s.apps.googleusercontent.com',
        'offline': true
      }).then( res =>  { 
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( user => {
          // console.log("Firebase success: " + JSON.stringify(user));
          this._up.cargar_usuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'google'
          );
          this.navCtrl.setRoot(HomePage );
        })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
    }

    showAlert(titulo, mensaje){
      this.alertCtrl.create({
        title: titulo,
        subTitle : mensaje,
        buttons: ['OK']
      }).present();
    }

}
