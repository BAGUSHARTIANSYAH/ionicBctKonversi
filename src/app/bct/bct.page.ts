import { Component, OnInit } from '@angular/core';
import {ClassSupportService} from 'src/app/class-support.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-bct',
  templateUrl: './bct.page.html',
  styleUrls: ['./bct.page.scss'],
  
})
export class BctPage implements OnInit {
  public value:Data;
  selectFlute:any[]=[
    {
      value:'B'
    },
    {
      value:'C'
    },
    {
      value:'A'
    },
    {
      value:'BC'
    },
    {
      value:'AC'
    }
  ];  
  constructor(private cs:ClassSupportService) {
    this.value={
      Konstanta:0,
      panjangMM:0,
      panjangCM:0,
      lebarMM:0,
      lebarCM:0,
      tinggiMM:0,
      tinggiCM:0,

      Flute:'',
      FaceLiner:0,
      TebalSheet:0,
      SubtanceSW_K:0,
      SubtanceSW_M:0,
      SubtanceSW_KK:0,
      BlackLiner:0,

      BCAF:0,
      TakeUpFactorBF:0,  
      TakeUpFactorCF:0,
      ECT_BF:0,  
      ECT_CF:0,
      ECT_AF:0,
      TakeUpFactorAF:0,

      SubtanceDW_KolomC:0,
      SubtanceDW_KolomF:0,
      SubtanceDW_Kolomi:0,
      SubtanceDW_Koloml:0,
      SubtanceDW_Kolom0:0,

      FaceLiner2:0,
      BForAF:0,
      MiddleLiner:0,
      CF:0,
      BackLiner:0,
      ECT_BCF:0,
      ECT_ACF:0,


      STD_ECT:0,
      BCT_McKee:0,
      BCT_McKee20:0,
      BCT_McKee30:0,
      CheckBox:{
        sub_K:true,
        sub_M:false
      },      
      SubtanctSelect:[
        {
          text:'SINGLE WALL',
          on:true
        },
        {
          text:'DOUBLE WALL',
          on:false
        }
      ],digitbulat:0,      
    };    
   }   
  ngOnInit() {          
    this.cs.removeDataLokal('data');
  }
  ionViewWillEnter() {    
    // console.log('ionViewWillEnter');
    console.log(this.value.TakeUpFactorBF+" <>");
    this.Hitung();
  }
  async selectedFlute($event){    
    var swicths;
    try {
      swicths=this.value.Flute=$event.target.value;
    } catch (error) {
      swicths=$event;
    }
    switch(swicths)  {
      case this.selectFlute[0].value:
        this.value.SubtanctSelect[0].on=true;
        this.value.SubtanctSelect[1].on=false;
      break;
      case this.selectFlute[1].value:
        this.value.SubtanctSelect[0].on=true;
        this.value.SubtanctSelect[1].on=false;
      break;
      case this.selectFlute[2].value:
        this.value.SubtanctSelect[0].on=true;
        this.value.SubtanctSelect[1].on=false;
      break;
      case this.selectFlute[3].value:
        this.value.SubtanctSelect[0].on=false;
        this.value.SubtanctSelect[1].on=true;
      break;
      case this.selectFlute[4].value:
        this.value.SubtanctSelect[0].on=false;
        this.value.SubtanctSelect[1].on=true;
      break;
    }
  }
  
  OnStar:boolean=true;
  public async Hitung(){    
    // const data = await this.getDataLokal();
    const data = await this.cs.getDataFromLokal("data");
    if(data){
      console.log('Data LOKAL');
      if(this.OnStar){
        this.value.panjangMM=data.panjangMM;
        this.value.lebarMM=data.lebarMM;
        this.value.tinggiMM=data.tinggiMM;
        this.value.Konstanta=data.Konstanta;
        this.value.Flute=data.Flute;
        this.selectedFlute(this.value.Flute);
        this.value.SubtanceSW_K=data.SubtanceSW_K;
        this.value.SubtanceSW_M=data.SubtanceSW_M;
        this.value.SubtanceSW_KK=data.SubtanceSW_KK;
        

        this.value.SubtanceDW_KolomC=data.SubtanceDW_KolomC;
        this.value.SubtanceDW_KolomF=data.SubtanceDW_KolomF;
        this.value.SubtanceDW_Kolomi=data.SubtanceDW_Kolomi;
        this.value.SubtanceDW_Koloml=data.SubtanceDW_Koloml;
        this.value.SubtanceDW_Kolom0=data.SubtanceDW_Kolom0;
        this.OnStar=false;
      }       
      this.value.Konstanta=data.Konstanta;
      this.value.TakeUpFactorBF=data.TakeUpFactorBF;
      this.value.TakeUpFactorCF=data.TakeUpFactorCF;
      this.value.TakeUpFactorAF=data.TakeUpFactorAF;


      this.value.panjangCM=this.value.panjangMM/10;
      this.value.lebarCM=this.value.lebarMM/10;
      this.value.tinggiCM=this.value.tinggiMM/10;
      this.value.BlackLiner=this.value.SubtanceSW_KK/100;
      this.value.FaceLiner2=this.value.SubtanceDW_KolomC/100;
      this.value.BForAF=this.value.SubtanceDW_KolomF/100;
      this.value.MiddleLiner=this.value.SubtanceDW_Kolomi/100;
      this.value.CF=this.value.SubtanceDW_Koloml/100;
      this.value.BackLiner=this.value.SubtanceDW_Kolom0/100;
      this.value.ECT_BCF=(1.2*(this.value.FaceLiner2+this.value.MiddleLiner+this.value.BackLiner+(this.value.TakeUpFactorBF*this.value.BForAF)+(this.value.TakeUpFactorCF*this.value.CF)))*1.02*0.65;
      this.value.ECT_ACF=(1.2*(this.value.FaceLiner2+this.value.MiddleLiner+this.value.BackLiner+(this.value.TakeUpFactorAF*this.value.BForAF)+(this.value.TakeUpFactorCF*this.value.CF)))*1.02;

      if(this.value.CheckBox.sub_K){  //subtanceSW
        this.value.FaceLiner=this.value.SubtanceSW_K/100;
      }else{
        this.value.FaceLiner=this.value.SubtanceSW_M/100;
      }
  
      this.value.BCAF=this.value.SubtanceSW_M/100;  //BCAF
  
      this.value.ECT_BF=(1.2*(this.value.BlackLiner+this.value.FaceLiner+(this.value.TakeUpFactorBF*this.value.BCAF)))*1.02*0.68;  //ECT_BF
      
      this.value.ECT_CF=(1.2*(this.value.BlackLiner+this.value.FaceLiner+(this.value.TakeUpFactorCF*this.value.BCAF)))*1.02*0.68;  //ECT_CF
  
      this.value.ECT_AF=1.2*(this.value.BlackLiner+this.value.FaceLiner+(this.value.TakeUpFactorAF*this.value.BCAF))*1.02;  //ECT_AF            
      switch (this.value.Flute){  //Flute & STD_ECT
        case 'B':
            this.value.TebalSheet=0.3;
            this.value.STD_ECT=this.value.ECT_BF;
        break;
        case 'C':
            this.value.TebalSheet=0.4;
            this.value.STD_ECT=this.value.ECT_CF;
        break;
        case 'BC':
            this.value.TebalSheet=0.7;
            this.value.STD_ECT=this.value.ECT_BCF;
        break;
        case 'A':
            this.value.TebalSheet=0.5;
            this.value.STD_ECT=this.value.ECT_AF;
        break;
        case 'AC':
            this.value.TebalSheet=0.9;
            this.value.STD_ECT=this.value.ECT_ACF;
        break;
        default:
            this.value.TebalSheet=0;
            this.value.STD_ECT=0;
        break;
      }  
      
      
      this.value.BCT_McKee=Number((this.value.Konstanta*this.value.STD_ECT*Math.sqrt(this.value.TebalSheet)*Math.sqrt((2*this.value.panjangCM)+(2*this.value.lebarCM))).toFixed(this.value.digitbulat));   
      this.value.BCT_McKee20=Number((this.value.BCT_McKee+(0.2*this.value.BCT_McKee)).toFixed(this.value.digitbulat));
      this.value.BCT_McKee30=Number((this.value.BCT_McKee+(0.3*this.value.BCT_McKee)).toFixed(this.value.digitbulat));  
      // this.save.set('data',{...this.value}); 
      this.cs.setDataToLokal("data",{...this.value});
    }else{
      console.log('data Awal');
      // this.value.panjangMM=370;
      // this.value.lebarMM=255;
      // this.value.tinggiMM=206;
      // this.value.Konstanta= 5.87;
      // this.value.Flute="B";

      // this.value.SubtanceSW_K=200;
      // this.value.SubtanceSW_M=150;
      // this.value.SubtanceSW_KK=200;
      // this.value.TakeUpFactorBF=1.4;
      // this.value.TakeUpFactorCF=1.5;

      // this.value.TakeUpFactorAF=1.6;
      // this.value.SubtanceDW_KolomC=200;
      // this.value.SubtanceDW_KolomF=150;
      // this.value.SubtanceDW_Kolomi=150;
      // this.value.SubtanceDW_Koloml=150;

      // this.value.SubtanceDW_Kolom0=200;
      this.value.CheckBox={
        sub_K:true,
        sub_M:false
      };
      // this.save.set('data',{...this.value});
      this.cs.setDataToLokal("data",{...this.value});
      this.Hitung();
    }
  }
}
interface Data{
  Konstanta:number;
  panjangMM:number;
  panjangCM:number;
  lebarMM:number;
  lebarCM:number;
  tinggiMM:number;
  tinggiCM:Number;

  Flute:string;
  FaceLiner:number;
  TebalSheet:number;
  SubtanceSW_K:number;
  SubtanceSW_M:number;
  SubtanceSW_KK:number;
  BlackLiner:number;

  BCAF:number;
  TakeUpFactorBF:number;  
  TakeUpFactorCF:number;
  ECT_BF:number;  
  ECT_CF:number;
  ECT_AF:number;
  TakeUpFactorAF:number;

  SubtanceDW_KolomC:number;
  SubtanceDW_KolomF:number;
  SubtanceDW_Kolomi:number;
  SubtanceDW_Koloml:number;
  SubtanceDW_Kolom0:number;

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
  CheckBox:any;
  SubtanctSelect:any[];
  digitbulat;
}
