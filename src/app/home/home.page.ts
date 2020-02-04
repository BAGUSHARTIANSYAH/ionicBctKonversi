import { Component } from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Storage} from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Konstanta:number = 5.87;
  panjangMM:number=370;
  panjangCM:number;
  lebarMM:number=255;
  lebarCM:number;
  tinggiMM:number=206;
  tinggiCM:Number;

  Flute:string="BC";
  FaceLiner:number;
  TebalSheet:number;
  SubtanceSW_K:number=200;
  SubtanceSW_M:number=150;
  SubtanceSW_KK:number=200;
  BlackLiner:number;

  BCAF:number;
  TakeUpFactorBF:number=1.4;  
  TakeUpFactorCF:number=1.5;
  ECT_BF:number;  
  ECT_CF:number;
  ECT_AF:number;
  TakeUpFactorAF:number=1.6;

  SubtanceDW_KolomC:number=200;
  SubtanceDW_KolomF:number=150;
  SubtanceDW_Kolomi:number=150;
  SubtanceDW_Koloml:number=150;
  SubtanceDW_Kolom0:number=200;

  FaceLiner2:number;
  BForAF:number;
  MiddleLiner:number;
  CF:number;
  BackLiner:number;
  ECT_BCF:number;
  ECT_ACF:number;


  STD_ECT:number;
  BCT_McKee:number;
  BCT_McKee20:number;
  BCT_McKee30:number;
  // 

  gets:tes;
  CheckBox:any={
    sub_K:true,
    sub_M:false
  };
  constructor(public navCtrl: NavController,private router: Router) {

  }
  ngOnInit() {
    
    this.Hitung();
  }
  async Hitung(){
    this.panjangCM=this.panjangMM/10;
    this.lebarCM=this.lebarMM/10;
    this.tinggiCM=this.tinggiMM/10;
    this.BlackLiner=this.SubtanceSW_KK/100;
    this.FaceLiner2=this.SubtanceDW_KolomC/100;
    this.BForAF=this.SubtanceDW_KolomF/100;
    this.MiddleLiner=this.SubtanceDW_Kolomi/100;
    this.CF=this.SubtanceDW_Koloml/100;
    this.BackLiner=this.SubtanceDW_Kolom0/100;
    this.ECT_BCF=(1.2*(this.FaceLiner2+this.MiddleLiner+this.BackLiner+(this.TakeUpFactorBF*this.BForAF)+(this.TakeUpFactorCF*this.CF)))*1.02*0.65;
    this.ECT_ACF=(1.2*(this.FaceLiner2+this.MiddleLiner+this.BackLiner+(this.TakeUpFactorAF*this.BForAF)+(this.TakeUpFactorCF*this.CF)))*1.02;


    // this.gets.nama='tes';
    // this.gets.num=90;
    // this.storage.set('yes',this.gets);

    
    // try {
    //   const fes=await this.storage.get('yes');
    //   console.log(fes.nama);
    // } catch (error) {
    //   console.log(error.error);
    // }



    // =IF(C22="B",X6,IF(C22="C",X7,IF(C22="BC",AC13,IF(C22="A",X8,IF(C22="AC",AC14,"o")))))
    if(this.CheckBox.sub_K){  //subtanceSW
      this.FaceLiner=this.SubtanceSW_K/100;
    }else{
      this.FaceLiner=this.SubtanceSW_M/100;
    }

    this.BCAF=this.SubtanceSW_M/100;  //BCAF

    this.ECT_BF=(1.2*(this.BlackLiner+this.FaceLiner+(this.TakeUpFactorBF*this.BCAF)))*1.02*0.68;  //ECT_BF
    
    this.ECT_CF=(1.2*(this.BlackLiner+this.FaceLiner+(this.TakeUpFactorCF*this.BCAF)))*1.02*0.68;  //ECT_CF

    this.ECT_AF=1.2*(this.BlackLiner+this.FaceLiner+(this.TakeUpFactorAF*this.BCAF))*1.02;  //ECT_AF      
    
    switch (this.Flute){  //Flute & STD_ECT
      case 'B':
          this.TebalSheet=0.3;
          this.STD_ECT=this.ECT_BF;
      break;
      case 'C':
          this.TebalSheet=0.4;
          this.STD_ECT=this.ECT_CF;
      break;
      case 'BC':
          this.TebalSheet=0.7;
          this.STD_ECT=this.ECT_BCF;
      break;
      case 'A':
          this.TebalSheet=0.5;
          this.STD_ECT=this.ECT_AF;
      break;
      case 'AC':
          this.TebalSheet=0.9;
          this.STD_ECT=this.ECT_ACF;
      break;
      default:
          this.TebalSheet=0;
          this.STD_ECT=0;
      break;
    }  
    
    
    this.BCT_McKee=5.87*this.STD_ECT*Math.sqrt(0.7)*Math.sqrt((2*this.panjangCM)+(2*this.lebarCM));

    this.BCT_McKee20=this.BCT_McKee+(0.2*this.BCT_McKee);
    this.BCT_McKee30=this.BCT_McKee+(0.3*this.BCT_McKee);
  }

  async CheckBoxSubtance(no:number){    
    if(no==1){
      if(this.CheckBox.sub_K){
        this.CheckBox.sub_M=false;
      }else{
        this.CheckBox.sub_M=true;
      }    
    }else{
      if(this.CheckBox.sub_M){
        this.CheckBox.sub_K=false;
      }else{
        this.CheckBox.sub_K=true;
      }
    }
  }

  async Rediract(){
    // this.router.navigateByUrl('../login/login.page');
    // this.navCtrl.setRoot(LoginPage);
  }
}

interface tes{
  nama:string;
  num:number;
}