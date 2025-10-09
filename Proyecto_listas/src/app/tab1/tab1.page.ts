import { Component } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { CommonModule } from '@angular/common';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
  //imports: [//ionicModule, ExploreContainerComponent, 
  //CommonModule]
})
export class Tab1Page {

  constructor(
    public listaService:ListaService
    ) {}

    async AgregarLista() {
    let alerta = await this.listaService.alertController.create({
    header: "Agregar lista",
    inputs: [
    {
    type: "text",
    name: "titulo",
    placeholder: "Ingresar nombre de la lista"
    }
    ]
    ,
    buttons: [
    {
    text: "Cancelar",
    role: "cancel"
    },
    {
    text: "Crear",
    handler: (data:any)=> {
      
    let esValido: boolean = this.listaService.validarInput(data);
    if (esValido){         //control de validación antes de ingresar los datos en el LocalStorage
    let creadaOk = this.listaService.crearLista(data.titulo);
    if(creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada
    this.listaService.presentToast('Lista creada correctamente!');
    }
    }
    }
  }
  ]
  })
  await alerta.present();
  console.log('Click en el botón');


  


  }
  

  /**
* @function AgregarLista
* @description La función será ejecutada cuando el usuario haga click en el botón Agregar
* Muestra una alerta donde solicita el nombre de la lista
*/
 
  unread(){
    
  }

  //eliminarLista(listaItem: Lista) {
  // this.listaService.eliminarLista(listaItem);
  // console.log("Eliminar lista:", listaItem);}

  //editarLista(listaItem: Lista) {
  //this.EditarLista(listaItem);}

  /*async EditarLista(lista: Lista) {
let alerta = await this.alertController.create({
header: "Editar lista",
inputs: [
{
type: "text",
name: "titulo",
placeholder: "Ingresar nuevo nombre de la lista",
value: lista.titulo
}
],
buttons: [
{
text: "Cancelar",
role: "cancel"
},
{
text: "Editar",
handler: (data:any)=> {
let esValido: boolean = this.validarInput(data);
if (esValido){
lista.titulo = data.titulo,
this.listaService.editarLista(lista);
this.presentToast('Lista editada correctamente!');
}
}
}
]
})
await alerta.present();
}*/

}

