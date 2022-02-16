import { TestBed } from '@angular/core/testing';
import loginData from '../../assets/login-response.json'
import { LocalLoginValidationService } from './local-login-validation.service';

describe('LoginValidationService', () => {
   let login_response = loginData;
  let service: LocalLoginValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalLoginValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validateUser should return false on non valid user', () => {
    expect(service.validateUser({ userName: 'a', password: 'b' })).toEqual(false);
  });

  it('validateUser should return true on valid user', () => {
    expect(service.validateUser({ userName: 'test', password: 'test' })).toEqual(true);
  });

  it('get Error Msg should return error msg', () => {
    expect(service.getErrormsg).toEqual(login_response.error);
  });
});
