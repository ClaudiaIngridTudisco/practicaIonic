
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  //Esto hace que el servicio esté disponible en toda la app sin necesidad de registrarlo manualmente en un módulo.

export class ListaService {

   public listas: any[] = [];   //variable global que almacena las listas generadas

  constructor() {
   }

   crearLista(nombreLista:string){
    let ObjetoLista = {//creamos una variable de tipo array
      id: 0,
      titulo: nombreLista,
      creadaEn: new Date(),
      terminadaEn: null,
      completada: false,
      item: []      //Para guardar la lista de actividades
      
    };
    this.listas.push(ObjetoLista);//Ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();
    return ObjetoLista.titulo;     //Validamos si la lista fue creada,
  }


    //función para guardar las listas en el localStorage

    guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el se-gundo el contenido
    }

   }

