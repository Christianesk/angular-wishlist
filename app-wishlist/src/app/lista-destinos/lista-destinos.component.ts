import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajeModel>;
  listaUrl: string[];
  updates: string[];
  all;



  constructor(private destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
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

  agregado(d: DestinoViajeModel) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViajeModel) {
    this.destinosApiClient.elegir(e);
  }

  getAll() {

  }

}
