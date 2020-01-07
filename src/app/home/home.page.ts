import { Component } from '@angular/core';
import { ANIMALES } from "../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio;
  audioTiempo:any;
  ordenando:boolean = true; 

  constructor() {

    this.animales = ANIMALES.slice(0);
  }

  reproducir (animal:Animal){
    
    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }
    console.log(animal);
    
    this.audio.src = animal.audio;
    
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion*1000);

  }

  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime=0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
      
    }
  }

  borrar_animal(idx:number){
    this.animales.splice(idx,1);
  }
  
  recargar_animales(event){

      
    setTimeout( ()=> {
      console.log("termino del refresh");
      this.animales = ANIMALES.slice(0);
    
      event.target.complete();

    }, 1000);

  }


  reorder (event){
    console.log(event);
   
    event.detail.complete();
  }
}
