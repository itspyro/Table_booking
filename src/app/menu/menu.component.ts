import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'app/services/recipe.model';
import { RestaurantService } from 'app/services/restaurants.service'; 
import { foodOrder } from 'app/services/foodOrder.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  orderedItems:foodOrder[]=[];
  

  constructor(public restService:RestaurantService) {}

  ngOnInit(): void {
    this.orderedItems=this.restService.orderedItems;
    console.log("Ordered Item : ",this.restService.orderedItems);
  }

  onAdd(id: number) {
    this.restService.orderedItems.find((item,ind)=>{
      if(item.recipeId===id){
        this.restService.orderedItems[ind].quantity++;
        this.restService.total_amt+=this.restService.orderedItems[ind].price;
      }
      //console.log("Ordered Item : ",this.restService.orderedItems[ind]);
    })
    
  }

  // getQuantity(id:number){
  //   let ans=0;
  //   this.restService.orderedItems.find((item)=>{
  //     if(item.recipeId==id){
  //       ans=item.quantity;
  //     }
  //   })
  //   return ans;
  // }

  onRemove(id: number) {
    this.restService.orderedItems.find((item,ind)=>{
      if(item.recipeId===id){
        var temp=this.restService.orderedItems[ind].quantity;
        this.restService.orderedItems[ind].quantity=Math.max(0,temp-1);
        if(temp-1>0){
          this.restService.total_amt-=this.restService.orderedItems[ind].price;
        }
      }
      //console.log("Ordered Item : ",this.restService.orderedItems[ind]);
    })
  }

  onChange(quantity:string,recipeId:number){
    //console.log("RecipeId :",recipeId);
    this.restService.orderedItems.find((item,ind)=>{
      if(item.recipeId===recipeId){
        const temp=this.restService.orderedItems[ind].quantity;
        this.restService.orderedItems[ind].quantity=parseInt(quantity);
        this.restService.total_amt+=(this.restService.orderedItems[ind].quantity-temp)*(this.restService.orderedItems[ind].price);
        //console.log("Ordered Item : ",this.restService.orderedItems[ind]);
      }
     
    })

    
  }
}
