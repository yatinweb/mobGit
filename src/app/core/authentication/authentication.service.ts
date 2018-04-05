import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface Credentials {
  access_token: string;
  token_type: string;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(private http: HttpClient) {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {data} context The Github  parameters.
   * @return {Observable<any>} The Github Token.
   */
  getToken(data: any): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.http.post('/login/oauth/access_token', data, {headers: headers})
      .map(response => {
        return response;
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }

  /**
   * Authenticates the user.
   * @param {data} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(data: any): Observable<Credentials> {
    // Replace by proper authentication call
    this.setCredentials(data);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
    }
  }

}
