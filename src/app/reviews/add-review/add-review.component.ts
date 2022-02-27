import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { RestaurantService } from 'app/services/restaurants.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  isAuthenticated?: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private restService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSubmitReview(data: any) {
    if (
      data.rating === '' ||
      data.review === '' ||
      data.rating === undefined ||
      data.review === undefined
    ) {
      this._snackBar.open('Please enter every field', 'Okay');
    } else if (this.isAuthenticated) {
      this.restService.addReview(data);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
