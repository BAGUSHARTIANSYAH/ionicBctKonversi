import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import {HTTPOriginal,HTTPResponse} from '@ionic-native/http';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../app/api.service';
import {BctPage} from 'src/app/bct/bct.page';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,    
    HTTP,
    ApiService,BctPage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


