import { Component, OnInit, HostBinding } from '@angular/core';
import {DestinoViajeModel} from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: DestinoViajeModel[];
  listaUrl:string[];


  constructor() { 
    this.destinos = [];
    this.listaUrl = [
      'https://placeimg.com/380/230/nature/sepia',
      'https://placeimg.com/380/230/arch/grayscale',
      'https://placeimg.com/380/230/nature/grayscale',
      'https://placeimg.com/380/230/people/grayscale',
      'https://placeimg.com/380/230/animals',
      'https://placeimg.com/380/230/tech',
      'https://placeimg.com/380/230/people/sepia',
      'https://placeimg.com/380/230/arch/sepia',
      'https://placeimg.com/380/230/animals/grayscale'];
  }

  ngOnInit() {
  }

  guardar(nombre:string, url:string,descripcion:string): boolean{

    this.destinos.push(new DestinoViajeModel(nombre,url,descripcion));
    return false;
  }

}
