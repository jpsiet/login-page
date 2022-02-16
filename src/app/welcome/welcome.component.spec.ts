import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' h1 tag should represent welcome msg', () => {
    let h1: HTMLElement = fixture.nativeElement.querySelector('h1.welcome-message');
    expect(h1.textContent).toEqual('');
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.welcomeMessage);
  });
});
