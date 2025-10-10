import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Actividad } from '../models/actividades.model';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
//import { Actividad } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AgregarPage implements OnInit {
    lista: Lista;
    nombreItem: string;

  constructor(
    private router: ActivatedRoute,
    public listaService: ListaService
  ) { 
  let idlista = this.router.snapshot.paramMap.get('idlista');
    this.lista = new Lista('');
    this.nombreItem = '';
    if(idlista) {
    let ObjetoLista = this.listaService.obtenerLista(idlista);
    if(ObjetoLista){
    this.lista = ObjetoLista;
    }
  }
  }

  ngOnInit() {
  }
  agregar() {
    console.log("AGREGAR");
    if(this.nombreItem.length === 0) { return }   //Si el nombre del item está vacío no hacemos nada
    const actividad = new Actividad(this.nombreItem);  //Creamos una nueva actividad con el nombre del item
    this.lista.item.push(actividad);  //Ingresamos el nuevo item al array de items de la lista actual
    this.listaService.guardarStorage(); 
    this.nombreItem = '';
  }

 

async EditarActividad(actividad: Actividad) { 
let alerta = await this.listaService.alertController.create({ 
header: "Editar actividad", 
inputs: [ 
{ 
type: "text", 
name: "titulo", 
placeholder: "Ingresar nuevo nombre de la act", 
value: actividad.descripcion
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
let esValido: boolean = this.listaService.validarInput(data); 
if (esValido){ 
actividad.descripcion = data.titulo, 
this.listaService.guardarStorage();
this.listaService.presentToast('Lista editada correctamente!'); 
} 
} 
} 
] 
}) 
await alerta.present(); 
}

editarActividad(actividad: Actividad) {
  this.EditarActividad(actividad);
 }
  
  eliminar(actividad: Actividad) {
    this.lista.item = this.lista.item.filter((item: Actividad) => item !== actividad);
    this.listaService.guardarStorage();
  }
  cambioCheck() {
    const pendientes = this.lista.item.filter((item: Actividad) => item.completado == false).length;
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = undefined;
    }
    this.listaService.guardarStorage();
  }
}
  

