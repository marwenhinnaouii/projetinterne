import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';
import { AjoutVoyagePage } from '../ajout-voyage/ajout-voyage.page';
import { InfoVoyagePage } from '../info-voyage/info-voyage.page';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-voyages-con',
  templateUrl: './voyages-con.page.html',
  styleUrls: ['./voyages-con.page.scss'],
})
export class VoyagesConPage implements OnInit {
  lstdays:any[]=[];
  index=0;
  Timetable:any[]=[];
  numberDay;
  langue;
  constructor(private menu:MenuController,private userService:UserService,
    private modal:ModalController,private loadingController:LoadingController,private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
     }

  ngOnInit() {
    this.langue=this.userService.language; 
    var lan;

    // this.userService.GetEducoUrl(localStorage.getItem('token')).subscribe(val=>{
    //   lan= val[0].langue;
       
    //   if(lan === "fr")  {
    //     this.userService.language = "fr";
    //    this.translate.setDefaultLang("fr"); 
    //    localStorage.setItem('langage',"fr");
    //   } else if(lan === "en"){
    //     this.userService.language = "en";
    //    this.translate.setDefaultLang("en"); 
    //    localStorage.setItem('langage',"en");  
    //   }else if(lan === "ar_TN"){
    //     this.userService.language = "ar";
    //    this.translate.setDefaultLang("ar"); 
    //    localStorage.setItem('langage',"ar");  
    //   }
    // });

    this.numberDay = (new Date()).getDay();

    this.menu.enable(true,'Conducteur');
    for (let i = 1; i < 7; i++) {
      this.lstdays.push(moment().weekday(i).format('DD'))
     }   
      this.changeday(this.numberDay);

     var element=document.getElementById(this.numberDay);
     element.classList.remove("unselected");
     element.classList.add("selected")
  }


  ionViewWillEnter() {
    this.langue=this.userService.language; 
    this.changeday(this.numberDay);
  }
  async changeday(i)
  {
    let dem;
          var msg = this.translate.get('Loading.Vpatienter').subscribe(
            value => {
              // value is our translated string
              dem = value;
             return value;
            }
          );
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: dem,
    });
    await loading.present();
    if(this.index==0)
   {this.index=1}
    if(i!=this.index )
   { 
     var element=document.getElementById(String(i));
   if(element)
  { element.classList.remove("unselected");
   element.classList.add("selected");}
   element=document.getElementById(String(this.index));
   element.classList.add("unselected");
   element.classList.remove("selected");
    this.index=i;}
   var days=new Array();
   
   this.userService.getuser(localStorage.getItem('token'),localStorage.getItem('userid')).subscribe(value=>{
     console.log("getuser",value);
     var ch=JSON.stringify(value.voyages);
     localStorage.setItem('listVoyage',ch);
   for (let j = 0; j < value.voyages.length; j++) {
     if( this.ComapredayValue(i,value.voyages[j].dateDepart)){
       days.push({
         circuit:value.voyages[j].circuit?.nomFr,
         classe:'',
         badge:value.voyages[j].statut,
         vehicule:value.voyages[j].vehicule?.name,
         datedep:moment(value.voyages[j].dateDepart).format('YYYY-MM-DD HH:mm'),
       Enseignant:'test',
       info:value.voyages[j]
     })
     }
   }
   loading.dismiss();
   this.Timetable=days;
  })
 
   
 }

 getbordercolor(color){
  return '1px solid'+color;
}
ComapredayValue(i,day:Date)
{
  moment(day).format("YYYY-MM-DD")
  if( moment(day).format("YYYY-MM-DD")==moment().weekday(i).format('YYYY-MM-DD'))
  {
   return true;
    
  }
  else
  {
    return false;
  }
  
}
async ajouterVoyage()
{
  const modal = await this.modal.create({
    component: AjoutVoyagePage,
    cssClass: 'my-custom-class'
  });
   await modal.present();
   modal.onDidDismiss().then(val=>{
    this.changeday(this.index)
     
   })
  
}
async afficherliste(item)
{
  const modal = await this.modal.create({
    component: InfoVoyagePage,
    componentProps:{selectedVoyage:item},
    cssClass: 'my-custom-class'
  });
   await modal.present();
   modal.onDidDismiss().then(val=>{
    this.changeday(this.index)
     
   })
  
}
}
