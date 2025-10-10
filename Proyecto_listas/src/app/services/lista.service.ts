
import { Injectable } from '@angular/core';
import {Lista} from "../models/lista.model";
import { AlertController, ToastController } from '@ionic/angular';
import { Actividad } from "../models/actividades.model";

@Injectable({
  providedIn: 'root'
})
  //Esto hace que el servicio esté disponible en toda la app sin necesidad de registrarlo manualmente en un módulo.

export class ListaService {

   public listas: Lista[] = [];   //Almacena las listas de actividades
   
    constructor(
    public alertController:AlertController, 
    public toastController:ToastController
    ) {
    this.cargarStorage();
   }

   crearLista(nombreLista:string){
    let ObjetoLista = new Lista (nombreLista);

    this.listas.push(ObjetoLista);//Ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();
    return ObjetoLista.titulo;     //Validamos si la lista fue creada,
  }


    //función para guardar las listas en el localStorage

    guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el segundo el contenido
    }

    obtenerLista(idlista: string | number) {
    const id = Number(idlista); //Parseamos el dato a Number, por si viene de tipo string, de esta manera siempre trabajaremos con un Number
    let lista = this.listas.find((itemLista)=> itemLista.id == id);
    return lista;
    }

    //Función para evitar que se borren los datos cargados en el LocalStorage

    cargarStorage() {
 
      const listaStorage = localStorage.getItem('listas');
      if (listaStorage === null) {
        return this.listas = [];
      } else {
        let objLista = JSON.parse(listaStorage);
        // Reconstruir instancias de Lista y Actividad revisar
        this.listas = objLista.map((l: any) => {
          const nuevaLista = new Lista(l.titulo);
          nuevaLista.id = l.id;
          nuevaLista.creadaEn = new Date(l.creadaEn);
          nuevaLista.terminadaEn = l.terminadaEn ? new Date(l.terminadaEn) : undefined;
          nuevaLista.completada = l.completada;
          nuevaLista.item = (l.item || []).map((a: any) => {
            const nuevaActividad = new Actividad(a.descripcion);
            nuevaActividad.completado = a.completado;
            return nuevaActividad;
          });
          return nuevaLista;
        });
        return this.listas;
      }
    }

    eliminarLista(lista: Lista) {
    let nuevoListado = this.listas.filter((listaItem)=> listaItem.id !== lista.id); //Guardamos todas las listas menos la lista a eliminar //filter devuelve un arreglo de listas
    this.listas = nuevoListado;
    this.guardarStorage();
  }

    editarLista(lista: Lista) {
    let listaEditar = this.listas.find((listaItem)=> listaItem.id == lista.id); //Guardamos todas las listas menos la lista a eliminar //find devuelve el primer valor que encuentra
    if(listaEditar) {
    listaEditar.titulo = lista.titulo;
  }
    this.guardarStorage();
  }


  validarInput(input: any):boolean {
  if(input && input.titulo) {
  return true;
}
  this.presentToast('Debe ingresar un valor');
   return false; 
  }

  async presentToast(mensage:string) {
  let toast = await this.toastController.create({
  message: mensage,
  duration: 2000
  });
  toast.present();
  }

   }

