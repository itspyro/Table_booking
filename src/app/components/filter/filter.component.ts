import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor(private http:HttpClient,private router:Router){  
  }
  
  onSubmit(data:any){
    this.http.post('http://localhost:3000/filter',data).subscribe((result:any)=>{
      console.warn(result);
      })
    }

}
