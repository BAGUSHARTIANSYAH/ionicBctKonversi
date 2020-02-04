import { Injectable } from '@angular/core';

import {Storage} from '@ionic/storage';
import { AlertController,NavController,Platform,ModalController  } from '@ionic/angular';
import { Router,ActivatedRoute  } from '@angular/router';
import { HTTP, } from '@ionic-native/http/ngx';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClassSupportService {
  url:any;
  data:any;  
  constructor(public memory:Storage,public alert:AlertController,public redirect:Router,public send:HTTP,public platfrom :Platform,
    public navCTRL:NavController,public modalCTRL:ModalController,public locationRouter:Location,private http: HttpClient
  ) { 
    this.url='http://192.168.99.75:8080/api/';
    this.data={
      method:'post',      
      timeout: 2000
    };
  }

  async setDataToLokal(nama,data){
    return this.memory.set(nama,data);
  }
  async getDataFromLokal(nama){
    return this.memory.get(nama);
  }
  async removeDataLokal(nama){
    return this.memory.remove(nama);
  }

  async _post(keyApi,data){
    data.header=await this.getDataFromLokal("session");
    await this.http.post(this.url+keyApi,data).subscribe((respon)=>{
      
      console.log(respon+" <> respons");

    });  
    // let request = await this.http[this.data.method](
    //   this.url, this.data.data, this.data.headers
    // );  
    // request = JSON.parse(request.data);
    // console.log(request);
  }
  _getDate(format:String) {    
    var date = new Date();
    switch(format){
        case "date":
          format=date.toDateString();
        break
        case "dd":
          format=date.getDate().toString();
          if(format.length==1){
            format="0"+format;
          }
        break
        case "mm":
          format=(date.getMonth() + 1).toString();
        break
        case "yy":
          format=date.getFullYear().toString();
        break
        case "datetime":
            // format=Format(date,"dd:mm:yy");
        break        
    }  
    return format;
  }
  async _redirect(alamat:String){
    this.redirect.navigate(["/"+alamat]);    
  }
  async _alert(pesan:String){
    let alert =await this.alert.create({
      // header:"Notif",
      subHeader:" ERROR",
      message:pesan.toString(),
      buttons:['OK']
    });    
    await alert.present();
  }
  async _back(){
    // this.locationRouter.back();
    // this.navCTRL.back();
    return navigator['/menu'];
  }
  async _close(dari){
    console.log(dari);    
    if(this.redirect.url=="/menu" || this.redirect.url=="/login"){
      return navigator['app'].exitApp();
    }else{
      return this._back();
    }
  }
  
}
