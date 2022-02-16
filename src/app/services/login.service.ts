import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,throwError } from 'rxjs';
import { NotificationService } from '../shared/notification/notification.service';
import { Login } from './local-login-validation.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly login_url: string = 'localhost:4200/login';
  constructor(private http: HttpClient, private ns: NotificationService) { }

  login(login: Login): Observable<any> {
    return this.http.post(this.login_url, login)
      .pipe(catchError(error => {
        return this.handleError(error);
      }));
  }
  // JUST IN CASE WE WANT TO HANDLE ERROR AT SERVICE LEVEL
  // FOR SOME REASON APART FROM INTERCPETOR LEVEL, AND THEN RETURN TO COMPONENT LEVEL
  handleError(error: any) {
    this.ns.alert(error.error.message);
    return throwError(() => error)
  }
}
