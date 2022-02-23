import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'app/services/address.model';
import { Cuisine } from 'app/services/cuisine.model';

@Component({
  selector: 'app-rest-overview',
  templateUrl: './rest-overview.component.html',
  styleUrls: ['./rest-overview.component.css']
})
export class RestOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() cuisines:Cuisine[]=[];

  @Input() description:string="";
  @Input() contact:string="";
  @Input() address:Address={buildingNo:"",street:"",area:"",landmark:"",city:"",pinCode:""};

}
