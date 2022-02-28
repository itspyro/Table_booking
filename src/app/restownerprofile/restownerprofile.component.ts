import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'app/services/user.model';
import { Restaurant } from 'app/services/restaurant.model';

import { UserprofileService } from 'app/services/userprofile.service';
import { Table } from 'app/services/table.model';
import { A } from '@angular/cdk/keycodes';
import { NgForm } from '@angular/forms';
import { AuthUser } from 'app/services/auth-user.model';
import { AuthService } from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from 'app/services/recipe.model';
import { RestaurantService } from 'app/services/restaurants.service';

@Component({
  selector: 'app-restownerprofile',
  templateUrl: './restownerprofile.component.html',
  styleUrls: ['./restownerprofile.component.css']
})
export class RestownerprofileComponent implements OnInit {
  isModify: boolean = false;
  isOwnerCheckbox: boolean = false;
  isOwner: boolean = false;
  isBenchModify:boolean = false;
  authUser?:AuthUser;
  userId!:any;
  isModifyUser:boolean = false;
  
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
    cuisineNames: [],
    userId:0
  };
  table = new Table;
  benches!: Table[];
  recipe = new Recipe;
  recipes!: Recipe[];

  change: string[] = [];
  constructor(private userservice: UserprofileService,
              private restService: RestaurantService,
              private authservice:AuthService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authservice.user.subscribe((res)=>{
      this.userId = res?.userId
    })
    this.userservice.getUser(this.userId);
    this.userservice.userProfile.subscribe((data) => {

      this.user = data;
      if (this.user.roleName == "owner") {
        this.userservice.getRestaurantByUser(this.user.userId);
        this.userservice.restaurantProfile.subscribe((data) => {

          this.restaurant = data;
          this.userservice.getAllBenches(this.restaurant.restaurantId)
          this.userservice.benchList.subscribe((data) => {
            this.benches = data;
          })
          this.restService.getRecipeByRestId(this.restaurant.restaurantId);
          this.restService.selectedRestaurantMenu.subscribe((data)=>{
            this.recipes = data
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
    this.restaurant.userId = this.user.userId
    this.userservice.updateRestaurantDetail(this.restaurant)
  }

  checkIsOwner() {
    if (this.user.roleName == "owner" && this.isOwnerCheckbox == true) {
      this.isOwner = true
    } else if (this.isOwnerCheckbox == true) {
      this._snackBar.open('You are not a owner','okay')
      this.isOwner = false
    } else {
      this.isOwner = false
    }
  }


  addTable(data: NgForm) {
    this.table = new Table;
    this.table.benchType = data.value.benchType;
    this.table.capacity = data.value.capacity;
    this.table.price = data.value.price;
    this.table.noOfBench = data.value.noOfTable;
    this.table.restaurantId = this.restaurant.restaurantId;
    if (
      this.table.benchType === undefined || 
      this.table.benchType === "" || 
      this.table.capacity === undefined || 
      this.table.capacity === 0 ||
      this.table.price === 0||
      this.table.noOfBench === 0||
      this.table.restaurantId === undefined ||
      this.table.price === undefined||
      this.table.noOfBench === undefined) 
      {
      console.log('Please enter every field')
    } else {
      this.userservice.addBench(this.table)
    }
    data.reset();
  }

  onDeleteButton(data:any){
    this.benches.forEach((element,index)=>{
      if(element.benchId === data.benchId){
        this.benches.splice(index,1)
      }
    })
    this.userservice.deleteBench(data.benchId)
  }
  onModifyButton(data:any){
    data.isModify = true
  }
  onSubmitButton(data:any){
    data.isModify = false;
    this.userservice.updateBenchDetail(data)
  }


  onModifyUser(){
    this.isModifyUser = true;
  }
  onSubmitUser(){
    this.userservice.updateUserDetail(this.user)
    this.isModifyUser = false
  }



  onModifyRecipeButton(data:any){
    data.isModify = true
  }
  onSubmitRecipeButton(data:any){
    data.isModify = false;
    this.restService.updateRecipe(data)
    
  }
  onDeleteRecipeButton(data:any){
    this.recipes.forEach((element,index)=>{
      if(element.recipeId === data.recipeId){
        this.recipes.splice(index,1)
      }
    })
    this.restService.deleteRecipe(data.recipeId)
  }
  addRecipe(data){
    this.recipe.recipeName = data.value.recipeName;
    this.recipe.restaurantId = this.restaurant.restaurantId;
    this.recipe.price = data.value.price;
    if(this.recipe.price==undefined||this.recipe.price==0||
      this.recipe.recipeName==undefined||this.recipe.recipeName==""){
        this._snackBar.open("Please enter everyfield",'ok')
      }else{
        this.restService.addRecipe(this.recipe)
      }
      data.reset();
  }
}
