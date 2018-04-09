import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '@app/search/profile/profile.component';
import * as _ from 'lodash';

const isFavoriteListKey = 'isFavoriteList';
const isHistoryListKey = 'isHistoryList';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  _isFavoriteList: any[];
  _isHisrotyList: any[];
  pushPage: any;
  resultSort = 'time';

  constructor() {
    this.pushPage = ProfileComponent;
    this.getItems();
  }

  ngOnInit() {
  }

  getItems() {
    const isFavoriteList = localStorage.getItem(isFavoriteListKey);
    if (isFavoriteList) {
      this._isFavoriteList = JSON.parse(isFavoriteList);
    } else {
      this._isFavoriteList = [];
    }
    const isHistoryList = localStorage.getItem(isHistoryListKey);
    if (isHistoryList) {
      this._isHisrotyList = JSON.parse(isHistoryList);
      this.changeSort('time');
    } else {
      this._isHisrotyList = [];
    }
  }

  removeHistory() {
    this._isHisrotyList = [];
    localStorage.removeItem(isHistoryListKey);
  }

  ionViewWillEnter() {
   this.getItems();
  }

  checkForfavorite(login: string) {
    return _.includes(this._isFavoriteList, login);
  }

  changeSort(ev: any) {
    if (ev === 'time') {
      this._isHisrotyList = this._isHisrotyList.slice().reverse();
    } else if (ev === 'name') {
      this._isHisrotyList = _.orderBy(this._isHisrotyList, ['login'], ['asc']);
     }
  }

}
