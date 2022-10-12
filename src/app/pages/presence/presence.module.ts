import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { PresencePageRoutingModule } from './presence-routing.module';

import { PresencePage } from './presence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresencePageRoutingModule,
    TranslateModule
  ],
  declarations: [PresencePage]
})
export class PresencePageModule {}
