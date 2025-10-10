import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaService } from 'src/app/services/lista.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { FiltroListaModule } from '../../pipes/filtro-lista-module';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FiltroListaModule]
})

export class ListasComponent implements OnInit {
  @Input() tipo: string = '';       //para pasar el parámetro del tab en el cual esté posicionado el usuario


  constructor(
    public listaService: ListaService,
    private router: Router
  ) { }

  listaSeleccionada(listaItem: Lista) {
    const URL = '/agregar/' + listaItem.id
    this.router.navigateByUrl(URL);
  }


  async EditarLista(lista: Lista) {
    let alerta = await this.listaService.alertController.create({
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
          handler: (data: any) => {
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido) {
              lista.titulo = data.titulo,
                this.listaService.editarLista(lista);
              this.listaService.presentToast('Lista editada correctamente!');
            }
          }
        }
      ]
    })
    await alerta.present();
  }


  editarLista(listaItem: Lista) {
    this.EditarLista(listaItem);
  }


  eliminarLista(listaItem: Lista) {
    this.listaService.eliminarLista(listaItem);
    console.log("Eliminar lista:", listaItem);
  }


  ngOnInit() { }
}