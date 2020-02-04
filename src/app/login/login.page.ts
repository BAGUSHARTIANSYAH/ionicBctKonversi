import { Component, OnInit } from '@angular/core';

import {ClassSupportService}from 'src/app/class-support.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  User:String="KSCCB";
  Password:String="";
  newpass:String="";
  show = true;
  constructor(private cs:ClassSupportService) {  
    for(let a=1;a<=3;a++){
      this.newpass=this.newpass+this.cs._getDate("dd").toString();
    }       
  }

  ngOnInit() {    
    this.cs.platfrom.ready().then(()=>{
      document.addEventListener('backbutton', () => {
        this.cs._close("login");
      }, false);
    })
    // this.Login();
  }
  async Login(){         
    if(this.User.toString()=="KSCCB" && this.Password.toString()==this.newpass){
      this.cs._redirect("menu");
    }else{
      this.cs._alert("user dan password tidak sesuai");
    }
    // console.log("<> "+this.cs._getDate("mm")+"<> "+this.cs._getDate("dd")+"<> "+this.cs._getDate("yy")+"<> "+this.cs._getDate("date")+" <>");
    // await this.con.SendPostFunction('RestApi',{nama:'tes'});
    // const data=await this.storage.get('ksccb-edn');
    // console.log("trussas");
  }
  public getType() {
    return this.show ? 'password' : 'text';
  }
  public toggleTextPassword(): void{
    this.show = (this.show==true)?false:true;
  }
}
