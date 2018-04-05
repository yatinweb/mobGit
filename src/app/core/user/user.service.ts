import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Get Login User Detail.
   * @return {Observable<any>} The Github User.
   */
  getUser(): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.http.get('/user', {headers: headers})
      .map(response => {
        return response;
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }

  /**
   * Search Users.
   * @param data The Search text.
   * @return {Observable<any>} The Github Userlist.
   */
  searchUser(data: any): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.http.get('/search/users?' + data, {headers: headers})
      .map(response => {
        return response;
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }

  /**
   * Get Users.
   * @param data The user login name.
   * @return {Observable<any>} The Github Userlist.
   */
  getUserProfile(data: any): Observable<any> {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.http.get('/users/' + data, {headers: headers})
      .map(response => {
        return response;
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }

}
