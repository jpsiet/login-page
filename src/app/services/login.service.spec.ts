import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { Login } from './local-login-validation.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [LoginService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('login method  should return success', () => {
    let loginDetails: Login = {
      userName: 'test',
      password: 'abc'
    }
    const expecteOut = 'success'
    loginService.login(loginDetails).subscribe({
      next: res => expect(res)
        .withContext('login info')
        .toEqual(expecteOut),
      error: fail
    });

    const req = httpTestingController.expectOne(loginService.login_url);
    expect(req.request.method).toEqual('POST');
    req.flush(expecteOut);

  });

  it('login method  should return error', () => {
    let loginDetails: Login = {
      userName: 'abc',
      password: 'abc'
    }
    const expecteOut = 'login not allowed';
    loginService.login(loginDetails).subscribe({
      next: login => fail('expected to fail'),
      error: error => {
        console.log(error);
        expect(error.error).toContain(expecteOut);
      }
    });
    const req = httpTestingController.expectOne(loginService.login_url);
    expect(req.request.method).toEqual('POST');

    // Respond with the mock heroes
    req.flush(expecteOut, { status: 400, statusText: 'Not Found' });
  });
});

