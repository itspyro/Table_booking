import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-restownerprofile',
  templateUrl: './restownerprofile.component.html',
  styleUrls: ['./restownerprofile.component.css']
})
export class RestownerprofileComponent implements OnInit {
  isModify : boolean = false;
  isOwner!: boolean;

  restowner = {
    'restName':'Tamasha',
    'name':'vismay Vinodbhai tandel vismay tandel vismay tandel ',
    'location':'New Delhi',
    'noOfTable':2,
    'pricePerTable':800,
    'gstNo':'1234123412',
    'pureVeg':true,
    'timeSlot':'8pm to 10pm'

  }
  constructor() { }

  ngOnInit(): void {
  }

  onModify(){
    this.isModify=true
    //this.dailog.open(UpdatableinfoComponent);
  }

}
