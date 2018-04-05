import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';
import { Router } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoadingController } from 'ionic-angular';

export interface UserObj {
  avatar_url: string;
  login: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  searchQuery = '';
  items: UserObj[];
  pushPage: any;

  constructor(private userService: UserService,
    private router: Router,
    public loadingCtrl: LoadingController) {
      this.pushPage = ProfileComponent;
    }

  ngOnInit() {
  }

  initializeItems(val: string) {
    this.items = [];
    const loading = this.loadingCtrl.create();
    loading.present();
    this.userService.searchUser('q=' + val).subscribe(result => {
      this.items = result.items;
      loading.dismiss();
    });
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.initializeItems(val);
    }
  }

  onCancel(ev: any) {
    this.items = [];
  }
}
