import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { IonicModule, NavParams } from 'ionic-angular';
import { UserService } from '../../core/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NavParamsMock } from '@app/search/profile/nav-params.mock';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    NavParamsMock.setParams('login', 'yatinweb');
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        IonicModule.forRoot(ProfileComponent)
      ],
      declarations: [ ProfileComponent ],
      providers: [UserService, {provide: NavParams, useClass: NavParamsMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
