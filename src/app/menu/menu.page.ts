import { Component, OnInit,AfterViewInit  } from '@angular/core';
import {ClassSupportService} from 'src/app/class-support.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  subscription;
  constructor(private cs:ClassSupportService) {
    
  }

  ngOnInit() { 
    this.cs.platfrom.ready().then(()=>{
      document.addEventListener('backbutton', () => {
        this.cs._close("menu");
      }, false);
    })   
  }
  async exit(){
    this.cs._post("login",{nama:'bagus'}).then(Response=>{
      console.log(Response);
    }).catch(Response=>{
      console.log('error '+Response.console.error
      );
    })
  }
}
