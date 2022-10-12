import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-detail-tp-cours-en',
  templateUrl: './detail-tp-cours-en.page.html',
  styleUrls: ['./detail-tp-cours-en.page.scss'],
})
export class DetailTpCoursEnPage implements OnInit {


  tp;
  image = "";
  fichier = "";
  doc = '';
  docLastP = '';
  video = "";

  constructor(public modalCtrl: ModalController, private userService: UserService,
    private menu: MenuController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));   }

  ngOnInit() {
    this.menu.enable(true, localStorage.getItem('role'));

    this.tp = JSON.parse(localStorage.getItem('DtpEn'));
    this.video = this.tp.video
    this.doc = this.tp.doc;
    if (this.doc) {
      const spltDoc = this.doc.split('.');
      this.docLastP = spltDoc[1];

      if (this.docLastP === "mp4") {
        this.image = this.userService.apiUrl + "/uploads/files/video/" + this.tp.doc;
      } else {
        this.fichier = this.userService.apiUrl + "/uploads/files/doc/" + this.tp.doc;
      }

    }

    if (this.video) {
      const spltDoc = this.video.split('.');
      this.docLastP = spltDoc[1];

      this.image = this.userService.apiUrl + "/uploads/files/video/" + this.tp.video;

    }


  }

  downloadV() {
    window.open(this.image, '_system', 'location=yes')
  }


  download() {
    window.open(this.fichier, '_system', 'location=yes')
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  formatDate(date) {
    return moment(date).format('DD-MM-YYYY')
  }


}
