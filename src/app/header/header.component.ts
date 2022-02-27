import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  private subscription?: Subscription;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  @Input() curr_url: string = '';

  showLocation() {
    return !(this.curr_url == '/' || this.curr_url == '/auth');
  }

  onNavigateHome() {
    this.router.navigate(['']);
  }

  onNavigateAuth() {
    this.router.navigate(['auth']);
  }

  onNavigateProfile() {
    this.router.navigate(['/profile']);
  }

  onNavigateOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
