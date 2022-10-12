import { Subscription } from 'rxjs';
import { MenuController, NavController } from '@ionic/angular';
import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})

export class ClassesPage implements OnInit {
  lstclasses = [];
  classes = [];
  constructor(private nav: NavController, private menu: MenuController, private US: UserService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
  }

  ngOnInit() {
    localStorage.setItem('role', 'Enseignant');

    var lan;
    // this.US.GetEducoUrl(localStorage.getItem('token')).subscribe(val=>{
    //   lan= val[0].langue;       
    //   if(lan === "fr")  {
    //     this.US.language = "fr";
    //     this.translate.setDefaultLang("fr"); 
    //     localStorage.setItem('langage',"fr"); 
    //   } else if(lan === "en"){
    //     this.US.language = "en";
    //     this.translate.setDefaultLang("en");
    //     localStorage.setItem('langage',"en");  
    //   }else if(lan === "ar_TN"){
    //     this.US.language = "ar";
    //     this.translate.setDefaultLang("ar"); 
    //     localStorage.setItem('langage',"ar"); 
    //   }
    // });
    
    this.US.getconnecteduser(localStorage.getItem('token')).subscribe(val => {
      val.enseignantClasses.forEach(element => {
        element.classe = this.US.SerializeJSONDL(element.classe, '/api/classes/')
        if (!this.exist(element.classe)) { this.lstclasses.push(element.classe); }
      });

      var x: Subscription
      for (let i = 0; i <= this.lstclasses.length; i++) {
        x = this.US.GetClasse(this.lstclasses[i]).subscribe(value => {
          this.classes.push(value);
          x.unsubscribe();
        });
      }
    })
  }


  exist(ch) {
    var ok = false
    for (let i = 0; i < this.lstclasses.length; i++) {
      if (this.lstclasses[i] == ch) {
        ok = true;
        break;
      }

    }
    return ok;
  }


  home(item) {
    console.log(item);    
    localStorage.setItem('classe', item.id);
    localStorage.setItem('anneeScolaire', item.anneeScolaire);
    localStorage.setItem('specialiteNiveau', item.specialiteNiveau);
    this.nav.navigateRoot('acceuil-es-tabs/emploi')

  }

}
