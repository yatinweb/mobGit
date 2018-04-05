import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: Router, useValue: mockRouter },
      ]
    });
  });

  beforeEach(inject([
    AuthenticationGuard,
  ], (_authenticationGuard: AuthenticationGuard,
      _authenticationService: AuthenticationService) => {

    authenticationGuard = _authenticationGuard;
  }));

});
