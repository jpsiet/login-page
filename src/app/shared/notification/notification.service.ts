import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private subject = new Subject<string>();

  // enable subscribing to alerts observable
  onAlert(): Observable<string> {
    return this.subject.asObservable();
  }
  // main alert method
  alert(message: string) {
    this.subject.next(message);
  }

}
