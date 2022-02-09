import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems = [{
    title: 'Fried Chicken Momo',
    price: 89,
    amount: 0,
  },
  {
    title: 'Fried Paneer Momo',
    price: 89,
    amount: 0,
  },
  {
    title: 'Chicken Fried Rice',
    price: 149,
    amount: 0,
  },
  {
    title: 'Chicken Lollipop',
    price: 199,
    amount: 0,
  },
  {
    title: 'Crispy Corn',
    price: 169,
    amount: 0,
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(index: number) {
    this.menuItems[index].amount++;
  }

  onRemove(index: number) {
    if(this.menuItems[index].amount > 0){
      this.menuItems[index].amount--;
    }
  }

}
