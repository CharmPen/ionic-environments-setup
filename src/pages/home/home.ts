import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ENV } from '@app/env';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  env = ENV.environmentSettings;
  constructor(public navCtrl: NavController) {

  }

}
