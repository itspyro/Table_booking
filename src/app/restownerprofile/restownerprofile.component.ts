import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'app/services/user.model';
import { Restaurant } from 'app/services/restaurant.model';

import { UserprofileService } from 'app/services/userprofile.service';
import { Table } from 'app/services/table.model';

@Component({
  selector: 'app-restownerprofile',
  templateUrl: './restownerprofile.component.html',
  styleUrls: ['./restownerprofile.component.css']
})
export class RestownerprofileComponent implements OnInit {
  isModify : boolean = false;
  isOwner: boolean = false;

  user=new User;
  restaurant !: Restaurant;
  table=new Table;
  benches!:Table[];

  change : string[] = [];
  constructor(private userservice:UserprofileService) { }

  ngOnInit(): void {
    this.userservice.getUser();
    this.userservice.userProfile.subscribe((data)=>{
      this.user = data;
      this.userservice.getRestaurantByUser(this.user.userId);
      this.userservice.restaurantProfile.subscribe((data)=>{
      this.restaurant = data;
      this.userservice.getAllBenches(this.restaurant.restaurantId)
      this.userservice.benchList.subscribe((data)=>{
        this.benches = data;
        console.log(this.benches)
      })
    })
    })    
    
  }

  onModify(){
    this.isModify=true
  }

  onSubmit(){
    this.isModify=false
    console.log(this.change)
  }

  checkIsOwner(){
    if(this.user.roleId==1 && this.isOwner==true){
      return true
    }else{
      return false
    }
  }

  addTable(data:any){
    this.table.benchType = data.type;
    this.table.capacity = data.capacity;
    this.table.restaurantId = this.restaurant.restaurantId;
    this.userservice.addBench(this.table)
  }
}
