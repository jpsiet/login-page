import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
 //  just in case if  diable for submit again or any other action...
  loading = false;
  loginForm!: FormGroup;
  subscription:Subscription = new Subscription()
  constructor(private loginService: LoginService,
    private router: Router) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get userName() { return this.loginForm.get('userName'); }

  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.loading = true;
   const loginSubs =  this.loginService.login(this.loginForm.value).subscribe({
      next: c => {
        this.router.navigate(['welcome']);
      },
      error: (error) => {
        // just in case for local handling
        console.log(error);
        this.loading = false;
      },
      complete:() => {
        this.loading = false;
        console.log("this.loading" + this.loading);
      }
    });

    this.subscription.add(loginSubs);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
