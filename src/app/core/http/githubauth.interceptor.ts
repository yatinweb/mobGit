import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Credentials {
    access_token: string;
    token_type: string;
}
const credentialsKey = 'credentials';

@Injectable()
export class GithubAuthInterceptor implements HttpInterceptor {
    private _credentials: Credentials | null;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const savedCredentials = localStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
        let authReq = req.clone();
        if (this._credentials !== undefined && this._credentials.access_token !== undefined) {
            authReq = req.clone({
                headers: req.headers.set('Authorization',
                    this._credentials.token_type + ' ' + this._credentials.access_token)
            });
        }
        return next.handle(authReq);
    }
}
