import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotificationComponent } from './notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';

const component = [NotificationComponent];
const modules = [CommonModule, ReactiveFormsModule,
  AlertModule];

@NgModule({
  declarations: [...component],
  exports: [...component, modules],
  imports: [...modules],
  providers: []
})
export class SharedModule { }
