import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public alertController:AlertController, 
    public toastController:ToastController,
    public listaService:ListaService) {}

    async AgregarLista() {
    let alerta = await this.alertController.create({
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
      
    let esValido: boolean = this.validarInput(data);
    if (esValido){         //control de validación antes de ingresar los datos en el LocalStorage
    let creadaOk = this.listaService.crearLista(data.titulo);
    if(creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada
    this.presentToast('Lista creada correctamente!');
    }
    }
    }
  }
  ]
  })
  await alerta.present();
  console.log('Click en el botón');
  }
  validarInput(input: any):boolean {
  if(input && input.titulo) {
  return true;
}
  this.presentToast('Debe ingresar un valor');
   return false; 
  }

  /**
* @function AgregarLista
* @description La función será ejecutada cuando el usuario haga click en el botón Agregar
* Muestra una alerta donde solicita el nombre de la lista
*/
  async presentToast(mensage:string) {
  let toast = await this.toastController.create({
  message: mensage,
  duration: 2000
  });
  toast.present();
  }
}

