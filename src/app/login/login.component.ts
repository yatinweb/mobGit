import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  private client_id = '133550a95c67187082d8';
  private scope = 'user,public_repo';
  private auth_url = 'https://github.com/login/oauth/authorize';
  private state = 'yatin';
  private client_secret = '5d246c1ec96d1be194e536f31448501c39391c7c';
  version: string = environment.version;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
                this.route.queryParams.subscribe(
                  (param: any) => {
                    const code = param['code'];
                    if (code !== undefined) {
                      this.getToken(this.getAuthCode(code));
                    }
                  });
              }

  ngOnInit() { }

  checkUrl() {
    this.route.queryParams.subscribe(
      (param: any) => {
        const code = param['code'];
        if (code !== undefined) {
          this.getToken(this.getAuthCode(code));
        } else {
          this.openGitPage();
        }
      });
  }

  openGitPage() {
    location.href = this.auth_url + '?client_id=' + this.client_id + '&scopes=' + this.scope + '&state=' + this.state;
  }

  getToken(_accessCode: any) {
    const data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      code: _accessCode,
      state: this.state
    };
    this.authenticationService.getToken(data)
      .subscribe(credentials => {
        this.authenticationService.login(credentials);
        this.router.navigate(['/'], { replaceUrl: true });
      });
  }

  login() {
    this.checkUrl();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  getAuthCode(url: any) {
    const error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
        console.log('Error getting authorization code: ' + error[1]);
    }
    return url;
  }

}
