import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

const component = [WelcomeComponent];
const modules = [CommonModule,WelcomeRoutingModule]

@NgModule({
  declarations: [...component],
  exports: [...component,...modules],
  imports: [...modules],
  providers: []
})
export class WelcomeModule { }
