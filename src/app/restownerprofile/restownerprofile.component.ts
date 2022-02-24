import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'app/services/user.model';
import { Restaurant } from 'app/services/restaurant.model';

import { UserprofileService } from 'app/services/userprofile.service';
import { Table } from 'app/services/table.model';
import { A } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-restownerprofile',
  templateUrl: './restownerprofile.component.html',
  styleUrls: ['./restownerprofile.component.css']
})
export class RestownerprofileComponent implements OnInit {
  isModify: boolean = false;
  isOwnerCheckbox: boolean = false;
  isOwner: boolean = false;

  user: User = {
    roleName: '',
    userId: 0,
    userPhoneNumber: '',
    userEmail: '',
    userName: ''
  };
  restaurant: Restaurant = {
    restaurantId: 0,
    restaurantName: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      pincode: ''
    },
    gstIn: '',
    contact: '',
    nonVeg: false,
    description: '',
    rating: 0,
    openingTime: '',
    closingTime: '',
    cuisines: []
  };
  table = new Table;
  benches!: Table[];
  benchType: string[] = ['private', 'general']
  selectedBenchType: string = '';

  change: string[] = [];
  constructor(private userservice: UserprofileService) { }

  ngOnInit(): void {
    this.userservice.getUser();
    this.userservice.userProfile.subscribe((data) => {

      this.user = data;
      if (this.user.roleName == "owner") {
        this.userservice.getRestaurantByUser(this.user.userId);
        this.userservice.restaurantProfile.subscribe((data) => {

          this.restaurant = data;
          this.userservice.getAllBenches(this.restaurant.restaurantId)
          this.userservice.benchList.subscribe((data) => {
            this.benches = data
            // data.forEach((element,index)=>{
            //   if(element.benchType!=this.benches[0].benchType){
            //     this.benches.push(element)
            //   }
            // })

            this.benches.forEach(element => {
              this.benchType.forEach((ele, index) => {
                if (ele == element.benchType) this.benchType.splice(index, 1)
              })
            })
          })
        })
      }
    })
  }

  onModify() {
    this.isModify = true
  }

  onSubmit() {
    this.isModify = false
    console.log(this.change)
  }

  checkIsOwner() {
    if (this.user.roleName == "owner" && this.isOwnerCheckbox == true) {
      this.isOwner = true
    } else if (this.isOwnerCheckbox == true) {
      console.log('You are not owner')
      this.isOwner = false
    } else {
      this.isOwner = false
    }
  }


  addTable(data: any) {
    this.table = new Table;
    this.table.benchType = this.selectedBenchType;
    this.table.capacity = data.capacity;
    this.table.price = data.price;
    this.table.noOfBench = data.noOfTable;
    this.table.restaurantId = this.restaurant.restaurantId;
    if (
      this.table.benchType === undefined || 
      this.table.benchType === "" || 
      this.table.capacity === undefined || 
      this.table.restaurantId === undefined ||
      this.table.price === undefined||
      this.table.noOfBench === undefined) 
      {
      console.log('Please enter every field')
    } else {
      this.benches.push(this.table);
      this.benchType.forEach((element, index) => {
        if (element == this.selectedBenchType) this.benchType.splice(index, 1)
      })
      this.userservice.addBench(this.table)
    }
    this.selectedBenchType = ""
  }

  onDeleteButton(data:any){
    this.benches.forEach((element,index)=>{
      if(element.benchId === data.benchId){
        this.benches.splice(index,1)
      }
    })
    this.userservice.deleteBench(data.benchId)
  }
}
