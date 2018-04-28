import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

//servicio
import { UsuarioProvider, Credenciales } from "../../providers/usuario/usuario";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:Credenciales = {};

  constructor(public navCtrl: NavController,
              private navParams:NavParams,
              private afAuth:AngularFireAuth,
              public _up:UsuarioProvider) {
    
    console.log(this._up.usuario);
    this.usuario = this._up.usuario;
    

  }

  salir(){
    this.afAuth.auth.signOut().then( resp => {
      this._up.usuario = {};
      this.navCtrl.setRoot(LoginPage);
    }).catch(err =>{err});
  }

}
