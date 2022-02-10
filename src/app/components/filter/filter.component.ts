import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Filters } from 'app/services/filter.model';
import { RestaurantService } from 'app/services/restaurants.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  onSubmit(filters: Filters) {
    // this.http.post('http://localhost:3000/filter',data).subscribe((result:any)=>{
    //   console.warn(result);
    //   })
    console.log(filters);
    this.restaurantService.applyFilters(filters);
  }
}
