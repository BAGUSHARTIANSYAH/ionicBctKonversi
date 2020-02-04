import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ResultRequest: Observable<any>;
  socket:string= 'https://sim.ksccb.com';
  url:any;
  params:any;
  constructor(private http: HTTP,private toast: ToastController,private loading: LoadingController,private storage: Storage) {

  }
  SendPostFunction(UrlApi:string,Data:any){
    this.SetStart();    
    this.url+=UrlApi;
    this.params={
        method:'post',
        data:Data,
        timeout: 2000
    }    
    return this.ProsesExec('RETURN');
  }
  SetStart(){
    this.url='http://192.168.99.75:8080/api/'
  }
  async ProsesExec(_return:string){
    const load=await this.loading.create({
      spinner: 'dots',
      message: 'Please wait...!'
    });        
    load.present();    
    try {
        const Header = await this.storage.get('session');
        this.params.header={};
        if(Header){
            this.params.header=Header;
        }
        
        // this.http.setDataSerializer('json');
        // this.http.setRequestTimeout(2000);

        console.log(this.params.method+' <method> '+this.url+' <url>');
        load.dismiss();
        
        try{
          // let ResultRequest = await this.http[this.params.method](
          //   this.url, this.params.data, this.params.header
          // );

          this.http.sendRequest(this.url,this.params).then(Response=>{
            console.log('sukses');
          }).catch(Response=>{
            throw Response.error;
          });
        }catch(error){
          console.log('gagal '+error.message);
        }
        console.log('sukses');
        // try {
          
        // } catch (error) {
        //   console.log(error.message);
        // }
        //  console.log(this.params.method+' <method> '+this.url+' <url>');
        // ResultRequest = JSON.parse(ResultRequest.data);

        // if(_return.length>0){
        //     // for function 
        //     if(this.ResultRequest.){                      
        //         load.dismiss();
                
        //         if(ResultRequest.NOTIF){
        //             this.Notif(ResultRequest.PESAN);
        //         }

        //         return ResultRequest.DATA;
        //     }else{
        //         throw ResultRequest.PESAN;
        //     }
        // }else{
        //     //untuk procedu atau tanpa return 
        //     if(ResultRequest.SUKSES){                      
        //         load.dismiss();
                
        //         if(ResultRequest.NOTIF){
        //             this.Notif(ResultRequest.PESAN);
        //         }
                
        //         return 'TRUE';
        //     }else{
        //         throw ResultRequest.PESAN;
        //     }
        // }
    } catch (error) {
      load.dismiss();
      this.Notif(error.message);
      return 'FALSE';
    }
  }
  Notif(message:string){
    this.toast.create({
        message: message, position: 'middle', duration: 2000,
        cssClass: 'dangerToast'
    });        
  }
  
}
