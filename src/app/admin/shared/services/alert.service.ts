import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: string;
  text: string;
}

@Injectable()
export class AlertService {
  alert$ = new Subject<Alert>();
  constructor() { }
  success(text: string): void {
    this.alert$.next({ type: 'success', text });
  }
  warning(text: string): void {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string): void {
    this.alert$.next({ type: 'danger', text });
  }

}
