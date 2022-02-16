import { Injectable } from '@angular/core';
import loginData from '../../assets/login-response.json'

export type Login = {
  userName: string;
  password: string;
}

export type LoginInfo = {
  valid: Login[];
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalLoginValidationService {
  private login_response: LoginInfo = loginData;
  constructor() {
  }

  validateUser(value: Login) {
    const found = this.login_response.valid.find(user => user.userName === value.userName
      || user.password === value.password);
    return !!found
  }
  get getErrormsg() {
    return this.login_response.error;
  }
}
