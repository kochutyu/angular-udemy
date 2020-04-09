import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authS: AuthService
  ) { }

  ngOnInit(): void {
  }

  logOut(event: Event): void { 
    event.preventDefault(); // выдміна стандартної переведення силки
    this.authS.logout();
    this.router.navigate(['/admin', 'login'])
  }
}
