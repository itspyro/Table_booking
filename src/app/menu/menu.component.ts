import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'app/services/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() menuItems?: Menu[];

  // menuItems = [{
  //   title: 'Fried Chicken Momo',
  //   price: 89,
  //   amount: 0,
  // },
  // {
  //   title: 'Fried Paneer Momo',
  //   price: 89,
  //   amount: 0,
  // },
  // {
  //   title: 'Chicken Fried Rice',
  //   price: 149,
  //   amount: 0,
  // },
  // {
  //   title: 'Chicken Lollipop',
  //   price: 199,
  //   amount: 0,
  // },
  // {
  //   title: 'Crispy Corn',
  //   price: 169,
  //   amount: 0,
  // }
  // ];

  constructor() {}

  ngOnInit(): void {}

  onAdd(index: number) {
    // ...
  }

  onRemove(index: number) {
    // ...
  }
}
