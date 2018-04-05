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
  resultSort = '';

  constructor() {
    this.pushPage = ProfileComponent;
    const isFavoriteList = localStorage.getItem(isFavoriteListKey);
    if (isFavoriteList) {
      this._isFavoriteList = JSON.parse(isFavoriteList);
    } else {
      this._isFavoriteList = [];
    }
    const isHistoryList = localStorage.getItem(isHistoryListKey);
    if (isHistoryList) {
      this._isHisrotyList = JSON.parse(isHistoryList);
      this._isHisrotyList = this._isHisrotyList.slice().reverse();
    } else {
      this._isHisrotyList = [];
    }
  }

  ngOnInit() {
  }

  removeHistory() {
    this._isHisrotyList = [];
    localStorage.removeItem(isHistoryListKey);
  }
  checkForfavorite(login: string) {
    return _.includes(this._isFavoriteList, login);
  }

  changeSort(ev: any) {
    // TODO: Change order by name
  }

}
