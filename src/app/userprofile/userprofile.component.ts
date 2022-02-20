import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  urllink="https://i.stack.imgur.com/YQu5k.png";
  selectFiles(event:any){
    if(event.target.files){
      var reader =new FileReader();
      reader.readAsDataURL(event.target.selectFiles[0]);
      reader.onload=(event:any)=>{
        this.urllink=event.target.result;
      }
    }
  }
  

}
