import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNavigateHome() {
    this.router.navigate(['']);
  }

  onNavigateAuth() {
    this.router.navigate(['auth']);
  }
}
