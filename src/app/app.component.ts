import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd  } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  curr_url:string="";

  constructor( private router: Router) {} 
  ngOnInit() {
      this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.curr_url=e.url;
        }
      });
  } 
}
