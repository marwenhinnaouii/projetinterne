import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-cours',
  templateUrl: './detail-cours.page.html',
  styleUrls: ['./detail-cours.page.scss'],
})
export class DetailCoursPage implements OnInit {

  cours;
  image="";
  fichier="";
  doc='';
  docLastP='';
  video="";

  constructor(public modalCtrl: ModalController,private userService:UserService,private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
  //  this.translate.setDefaultLang(localStorage.getItem('langage'));  
   }

  ngOnInit() {
    
    this.cours =JSON.parse(localStorage.getItem('Dcours'));  
    
    this.doc =  this.cours.doc;
    if(this.doc){
    const spltDoc = this.doc.split('.');
    this.docLastP = spltDoc[1];
    if(this.docLastP === "jpg" || this.docLastP ==="jpeg"|| this.docLastP ==="bmp"|| this.docLastP ==="gif"|| this.docLastP ==="png"|| this.docLastP ==="webp"){
      this.image = this.userService.apiUrl+"/uploads/files/doc/"+this.cours.doc;       
    } else{
      this.fichier = this.userService.apiUrl+"/uploads/files/doc/"+this.cours.doc;
    }
  
  }

  if(this.video){
    const spltDoc = this.video.split('.');
    this.docLastP = spltDoc[1];
    
      this.image = this.userService.apiUrl+"/uploads/files/video/"+this.cours.video;       
    
  
  }
    

  }

 
  download(){
    window.open(this.fichier, '_system', 'location=yes')
  }

  downloadV(){
    window.open(this.image, '_system', 'location=yes')
  }

  async close (){
    await this.modalCtrl.dismiss();
  }

  formatDate(date){
    return moment(date).format('DD-MM-YYYY')
  }


}
