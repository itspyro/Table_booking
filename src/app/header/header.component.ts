import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
  userLoggedIn = false;

  constructor(private router: Router) {}

  @Input() curr_url:string="";

  showLocation(){
    return !(this.curr_url=='/'||this.curr_url=='/auth');
  }

  onNavigateHome() {
    this.router.navigate(['']);
  }

  onNavigateAuth() {
    this.router.navigate(['auth']);
  }
}

