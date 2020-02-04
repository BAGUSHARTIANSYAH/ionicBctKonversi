import { Component, OnInit } from '@angular/core';
import {BctPage} from 'src/app/bct/bct.page';
import {ClassSupportService} from 'src/app/class-support.service'

import { from } from 'rxjs';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private pageBCT:BctPage,private cs:ClassSupportService) { }

  ngOnInit() {
    this.pageBCT.Hitung(); 
  }
  async SAVE(){    
    console.log(this.pageBCT.value.TakeUpFactorBF+" <>");
    await this.cs.setDataToLokal('data',{...this.pageBCT.value});
    // this.cs.redirect.navigate(['/bct']);    
    this.cs._redirect("bct");
  }
}
