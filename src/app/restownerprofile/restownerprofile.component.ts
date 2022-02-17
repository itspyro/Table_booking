import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from 'app/auth/dailog/dailog.component';
import { UpdatableinfoComponent } from './updatableinfo/updatableinfo.component';

@Component({
  selector: 'app-restownerprofile',
  templateUrl: './restownerprofile.component.html',
  styleUrls: ['./restownerprofile.component.css']
})
export class RestownerprofileComponent implements OnInit {
  isModify : boolean = false;

  restowner = {
    'restName':'Tamasha',
    'name':'vismay Vinodbhai tandel vismay tandel vismay tandel '
  }
  constructor(private dailog:MatDialog) { }

  ngOnInit(): void {
  }

  openModifyDialog(){
    this.dailog.open(UpdatableinfoComponent);
  }

}
