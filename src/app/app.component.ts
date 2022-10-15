import { UserService } from './Services/user.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, NavController, MenuController, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { BulletinPage } from './pages/bulletin/bulletin.page';
import { environment } from 'src/environments/environment';
import { CheckUpdateService } from './Services/check-update.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Geolocation} from '@capacitor/core';

import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
   isparent=null;
   role="";
   langueDe;
   latitude;
   longitude;
   longitud;

  constructor(
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private nav:NavController,
    private US:UserService,
    private menu:MenuController,
    private storage: Storage,
    private userService:UserService,
    private modalController:ModalController,
    private plt: Platform,
    private updateS: CheckUpdateService,
    private translate: TranslateService,
    private openNativeSettings: OpenNativeSettings,private globalization: Globalization) {    

      // this language will be used as a fallback when a translation isn't found in the current language
     this.translate.setDefaultLang("en");
     localStorage.setItem('langage',"en");
    //  this.globalization.getPreferredLanguage()
    //  .then(res => {console.log("globalization ok",res.value);
    //  var ch = res.value.split('-');
    
     
    //  this.translate.setDefaultLang(ch[0]);}
    //  )
    //  .catch(e => console.log("globalization not ok",e));

    this.role = localStorage.getItem('role');
    //this.openNativeSettings.open('location');


    var i =0;
   var x=  setInterval(()=>{
    if(localStorage.getItem('role')=='Eleve')
    {
      this.isparent='Eleve';
    }
    else
    {
      this.isparent=null;

    }
      this.nom=this.US.nom
      this.prenom=this.US.prenom
      
      i++;
     
     },3000);
    
    this.initializeApp();
   

   
   // this.getLocation()
   // this.backgroundMode.enable();
  }

  ngOnInit(){
    // const logBatteryInfo = async () => {
    //   const info = await Device.getLanguageCode();
    
    //   console.log("info,info",info);
    // };
    this.getLocation()
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(this.latitude,this.longitude);
    this.getLocation2();
    
  }

  disconnect(){
    //localStorage.clear();
    this.menu.close();
    this.storage.remove('apiToken');
    this.storage.remove('rememberme');
    //this.storage.remove('reftoken');
    localStorage.removeItem('reftoken');
  }
  
  close(){
    this.menu.close();
  }
  nom='';
  prenom='';
  ionViewDidEnter(){
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

    });
  }

  

  getLocation2(){
   
      this.US.getLangue(this.latitude, this.longitude).subscribe(val => {        
        console.log("countryCode",val.countryCode);
        
        if (val.countryCode === "TN") {
          this.translate.setDefaultLang("fr");
          localStorage.setItem('langage',"fr");
        } else if (val.countryCode === "SA") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "BH") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "CA") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "FR") {
          this.translate.setDefaultLang("fr");
          localStorage.setItem('langage',"fr");
        } else if (val.countryCode === "IR") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "JO") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "KZ") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "KG") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "KW") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "LB") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "OM") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "QA") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "TR") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "YE") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "EG") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        } else if (val.countryCode === "AE") {
          this.translate.setDefaultLang("en");
          localStorage.setItem('langage',"en");
        }
      });
 
  }

  evaluation()
  {this.userService.GetStudents(localStorage.getItem('eleveAnneeScolaires')).subscribe(val=>{

    if(val.bulletinEleves.length)
    {
      let ch = val.bulletinEleves[val.bulletinEleves.length-1].replace("/api/bulletin_eleves/",'')
      this.userService.getBulletinEtudiant(localStorage.getItem('token'),ch).subscribe(async value=>{
        const modal = await this.modalController.create({
          component: BulletinPage,
          cssClass: 'my-custom-class',
          componentProps:{
            bulletin:value
          }
        });
        return await modal.present();
      }
        
        
        )
      
    }
  })
}

  openInscri(){
    this.userService.GetEducoUrl(localStorage.getItem('token')).subscribe(val=>{
      
      window.open(val[0].lienInscrit)      
    },
    err=>{
      console.log(err);
      
    })
  
  }

}
