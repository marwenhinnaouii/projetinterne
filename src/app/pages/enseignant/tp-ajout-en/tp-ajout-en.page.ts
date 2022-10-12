import { cours, UserService } from "./../../../Services/user.service";
import { MenuController, ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tp-ajout-en',
  templateUrl: './tp-ajout-en.page.html',
  styleUrls: ['./tp-ajout-en.page.scss'],
})
export class TpAjoutEnPage implements OnInit {
  NewExc: cours = {
    subjet: "",
    description: "",
    matiere: "",
    Classe: [],
    date: "",
    doc:null,
    video:null,
    anneeScolaire:'',
    specialiteNiveau:''
    
  };
  lstmatieres=[];
  constructor(private modalController: ModalController,private US:UserService, private menu: MenuController,private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));   }

  ngOnInit() {
    this.menu.enable(true,localStorage.getItem('role'));

    this.lstmatieres=JSON.parse(localStorage.getItem('lstmatiers'));
    this.NewExc.Classe.push("/api/classes/"+localStorage.getItem('classe') )
    this.NewExc.anneeScolaire=localStorage.getItem('anneeScolaire');
    this.NewExc.specialiteNiveau=localStorage.getItem('specialiteNiveau');
    this.NewExc.date=  moment().format('MMMM Do YYYY, h:mm:ss a');
  }
  appendfile(event: FileList){
    var file= event.item(0)
    this.NewExc.doc=file
  }
  Ajouter(){

    document.getElementById('add').setAttribute("disabled","disabled");

    var docfile=this.NewExc.doc
   let form:FormData=new FormData();
   if(this.NewExc.doc){
    var docfile=this.NewExc.doc
    form.append('docFile',docfile)
  }
  
   form.append('subjet',this.NewExc.subjet)
   form.append('description',this.NewExc.description)
   form.append('matiere',this.NewExc.matiere)
   form.append('Classe',JSON.stringify(this.NewExc.Classe))
   form.append('date',this.NewExc.date)
   form.append('anneeScolaire',this.NewExc.anneeScolaire)
   form.append('specialiteNiveau',this.NewExc.specialiteNiveau)
   form.append('enseignant',"api/users/"+localStorage.getItem('en'))

    this.US.AjouterTP(localStorage.getItem('token'),form).subscribe(val=>{
      this.dismiss();
    });
    
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  ionViewWillLeave() {
    document.getElementById('add').removeAttribute("disabled");
  }

}
