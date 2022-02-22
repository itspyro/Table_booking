import { Component, Input, OnInit } from '@angular/core';
import { Cuisine } from 'app/services/cuisine.model';

@Component({
  selector: 'app-rest-overview',
  templateUrl: './rest-overview.component.html',
  styleUrls: ['./rest-overview.component.css'],
})
export class RestOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() cuisines: Cuisine[] = [];

  @Input() description: string = '';
  @Input() contact: string = '';
  @Input() address?: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    pincode: string;
  };
}
