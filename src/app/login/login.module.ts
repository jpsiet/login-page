import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login.component';
import { fakeLoginProvider } from './fake-login.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const component = [LoginComponent];
const modules = [CommonModule, ReactiveFormsModule,
  AlertModule,SharedModule];
const providers = [fakeLoginProvider]

@NgModule({
  declarations: [...component],
  exports: [...component, modules],
  imports: [...modules],
  providers: [...providers]
})
export class LoginModule { }
