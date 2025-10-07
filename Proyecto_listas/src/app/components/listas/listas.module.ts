import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from './listas.component';
import { FiltroListaModule } from '../../pipes/filtro-lista-module';


@NgModule({
  //declarations: [ListasComponent], esta línea produce error, se agrega a imports.
  imports: [CommonModule, FormsModule, IonicModule, ListasComponent,FiltroListaModule],
  exports: [ListasComponent]
})
export class ListasModule {}

