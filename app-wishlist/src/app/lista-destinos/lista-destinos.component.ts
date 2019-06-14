import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import {DestinoViajeModel} from '../models/destino-viaje.model';
import {DestinosApiClient} from '../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajeModel>;
  listaUrl:string[];
  


  constructor(private destinosApiClient: DestinosApiClient) { 
    this.onItemAdded= new EventEmitter();
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

  agregado(d:DestinoViajeModel){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e:DestinoViajeModel){
    this.destinosApiClient.getAll().forEach((x)=>x.setSelected(false));
    e.setSelected(true);
  }

}
