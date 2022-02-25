import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'app/services/recipe.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() menuItems?: Recipe[];

  constructor() {}

  ngOnInit(): void {}

  onAdd(index: number) {
    // ...
  }

  onRemove(index: number) {
    // ...
  }
}
