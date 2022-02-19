import { Component, Input, OnInit } from '@angular/core';
import { Cuisines } from 'app/services/cuisine.model';

@Component({
  selector: 'app-rest-overview',
  templateUrl: './rest-overview.component.html',
  styleUrls: ['./rest-overview.component.css']
})
export class RestOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() cuisines:Cuisines[]=[];

  @Input() description:string="";
  @Input() contact:string="";
  @Input() address:string="";

}
