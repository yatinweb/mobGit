import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

export interface UserObj {
  avatar_url: string;
  login: string;
  name: string;
  email: string;
  bio: string;
  company: string;
  followers: number;
  following: number;
  timestamp: Date;
}

const isFavoriteListKey = 'isFavoriteList';
const isHistoryListKey = 'isHistoryList';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  login: string;
  userProfile: UserObj;
  isFavorite = false;
  _isFavoriteList: any[];
  _isHisrotyList: any[];

  constructor(
    private userService: UserService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
      this.login = this.navParams.get('login');
      const isFavoriteList = localStorage.getItem(isFavoriteListKey);
      if (isFavoriteList) {
        this._isFavoriteList = JSON.parse(isFavoriteList);
      } else {
        this._isFavoriteList = [];
      }
      const isHistoryList = localStorage.getItem(isHistoryListKey);
      if (isHistoryList) {
        this._isHisrotyList = JSON.parse(isHistoryList);
      } else {
        this._isHisrotyList = [];
      }
  }

  ngOnInit() {
    const loading = this.loadingCtrl.create();
    loading.present();
    if (_.includes(this._isFavoriteList, this.login)) {
      this.isFavorite = true;
    }
    this.userService.getUserProfile(this.login).subscribe(userProfile => {
      loading.dismiss();
      this.userProfile = userProfile;
      this.userProfile.timestamp = new Date();
      this._isHisrotyList.push(this.userProfile);
      localStorage.setItem(isHistoryListKey, JSON.stringify(this._isHisrotyList));
    });
  }

  updateFavoriteDetail() {
    if (_.includes(this._isFavoriteList, this.login)) {
      _.pull(this._isFavoriteList, this.login);
      this.isFavorite = false;
    } else {
      this._isFavoriteList.push(this.login);
      this.isFavorite = true;
    }
    localStorage.setItem(isFavoriteListKey, JSON.stringify(this._isFavoriteList));
  }

}
