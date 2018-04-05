import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '@env/environment';

/**
 * Prefixes before get token requests with `environment.oauthUrl`.
 * * Prefixes After get token requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === '/login/oauth/access_token') {
      request = request.clone({ url: environment.oauthUrl + request.url });
    } else {
      request = request.clone({ url: environment.serverUrl + request.url });
    }
    return next.handle(request);
  }

}
