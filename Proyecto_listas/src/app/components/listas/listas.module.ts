import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from './listas.component';


@NgModule({
  //declarations: [ListasComponent], esta línea produce error, se agrega a imports.
  imports: [CommonModule, FormsModule, IonicModule, ListasComponent],
  exports: [ListasComponent]
})
export class ListasModule {}

