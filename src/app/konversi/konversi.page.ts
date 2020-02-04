import { Component, OnInit } from '@angular/core';
import {ClassSupportService} from 'src/app/class-support.service'
@Component({
  selector: 'app-konversi',
  templateUrl: './konversi.page.html',
  styleUrls: ['./konversi.page.scss'],
})
export class KonversiPage implements OnInit {  
  selectkonversi:any[]=[
    {satuan:'kgf',selectTO:'1|2|3',nilai:'9.80665|0.00980665|2.204623'}, //0

    {satuan:'N',selectTO:'0',nilai:'0.10204082'},
    {satuan:'kN',selectTO:'0',nilai:'101.97162130'},
    {satuan:'lbf',selectTO:'0',nilai:'0.45359229'},
    {satuan:'kgf/cm',selectTO:'5|6|7',nilai:'980.00000|0.98066500|5.59974242'},
    {satuan:'N/m',selectTO:'4|7',nilai:'0.00102041|0.00571015'},
    
    {satuan:'kN/m',selectTO:'4|7',nilai:'1.01971621|5.71014830'},
    {satuan:'lbf/inch',selectTO:'4|6|5',nilai:'0.1785796|0.1751268|175.12680'},
    {satuan:'kgf/cm2',selectTO:'17|16|9|18',nilai:'98039.215700|98.06650000|98.07|14.2248'},
    {satuan:'kPa',selectTO:'8|18',nilai:'0.01019680|0.14504742'},
    {satuan:'cm',selectTO:'12|14',nilai:'0.3937|0.01'},
    
    {satuan:'cm2',selectTO:'13|15',nilai:'0.155|0.0001'},
    {satuan:'inch',selectTO:'10',nilai:'2.54'},
    {satuan:'inch2',selectTO:'11|15',nilai:'6.4516|0.00065'},
    {satuan:'m',selectTO:'10|12',nilai:'100|39.37'},
    {satuan:'m2',selectTO:'11|13',nilai:'10000|1550'},
    
    {satuan:'kN/m2',selectTO:'8|9|18',nilai:'0.01019716|1.000|0.14505'},
    {satuan:'N/m2',selectTO:'8|9|18',nilai:'0.00001020|0.001|0.00015'},
    {satuan:'PSI',selectTO:'8|9|16',nilai:'0.07029976|6.89429728|6.89405123'},        
  ];

  select:any={
    selectDari:'kgf',
    selectTo:'N',
    nilai:1,
    satuan:0,
    hasil:0,
    hasil1:0,
    digitpembulatan:2
  };  
  selectToKonversi:any=[];  
  constructor(private cs:ClassSupportService) { }

  ngOnInit() {
    this.cs.removeDataLokal('konversi');    
    this.Satuan(this.select.selectDari);
  }
  async Satuan($event){    
    try {
      this.select.selectDari=$event.target.value;      
      await this.cs.setDataToLokal('konversi',this.select);
    } catch (error) {
      this.select.selectDari=$event;
    }            
    const data= await this.cs.getDataFromLokal("konversi");
    if(data){
      this.select.selectDari=data.selectDari;
      this.select.selectTo=data.selectTo;
      this.select.nilai=data.nilai;
      this.select.satuan=data.satuan;
      this.select.hasil=data.hasil;
      this.select.hasil1=data.hasil1;
      this.select.digitpembulatan=data.digitpembulatan;


      for(let data of this.selectkonversi) {              
        if(data.satuan==this.select.selectDari){
          const selectto=data.selectTO.split('|');
          const splitsatuan=data.nilai.split('|');
          this.selectToKonversi=[];
          var masuk=true;          
          for(let a=0;a<selectto.length;a++){            
            this.selectToKonversi[a]={
              text:this.selectkonversi[Number(selectto[a])].satuan
            };   
            if(this.selectToKonversi[a].text==this.select.selectTo){
              this.select.selectTo=this.selectToKonversi[a].text;
              this.select.satuan=Number(splitsatuan[a]);
              masuk=false;
            }
          }   
          if(masuk){
            this.select.selectTo=this.selectToKonversi[0].text;
            this.select.satuan=Number(splitsatuan[0]);
          }
          this.hitung();
          break;
        }
      }
    }else{      
      await this.cs.setDataToLokal('konversi',this.select); 
    }
  }
  async selectToaction($event){
    try {
      this.select.selectTo=$event.target.value;
    } catch (error) {
      this.select.selectTo=$event;
    }       
    await this.cs.setDataToLokal('konversi',this.select); 

    this.Satuan(this.select.selectDari);     
  }

  async hitung(){     
    this.select.hasil=this.select.satuan*this.select.nilai;
    this.select.hasil1=(this.select.satuan*this.select.nilai).toFixed(this.select.digitpembulatan);    
    await this.cs.setDataToLokal('konversi',this.select); 

  }
  async tukar(){  
    var tam=this.select.selectDari;
    this.select.selectDari=this.select.selectTo;
    this.select.selectTo=tam;    
    await this.cs.setDataToLokal('konversi',this.select); 

    this.Satuan(this.select.selectDari);
  }
}
