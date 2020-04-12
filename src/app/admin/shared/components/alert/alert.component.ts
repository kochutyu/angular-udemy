import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() deley = 5000;
  alertSub: Subscription;
  text: string;
  type: string = 'success';
  constructor(
    private alertS: AlertService
  ) { }
  
  ngOnInit(): void {
     this.alertSub = this.alertS.alert$.subscribe(alert => {
      this.text = alert.text,
      this.type = alert.type
      
      const tiomeout = setTimeout(() => {
        clearTimeout(tiomeout);
        this.text = '';
      }, this.deley);
    });
  }
  
  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
