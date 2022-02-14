import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements DailogComponent {
  constructor(private readonly dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog() {
    console.error('Openning!');
    this.dialog.open(DailogComponent);
    console.error('Openning!');
  }
}
