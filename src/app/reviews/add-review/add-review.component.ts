import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmitReview(data:any){
    if(data.rating===''||data.review===''||data.rating===undefined||data.review===undefined){
     this._snackBar.open('Please enter every field','Okay')
    }
    else console.log(data)
  }

}
