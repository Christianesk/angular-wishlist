import { Injectable} from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destino-viajes-state.model';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViajeModel[];
  updates: string[];

  listaUrl: string[] = [
    'https://placeimg.com/380/230/nature/sepia',
    'https://placeimg.com/380/230/arch/grayscale',
    'https://placeimg.com/380/230/nature/grayscale',
    'https://placeimg.com/380/230/people/grayscale',
    'https://placeimg.com/380/230/animals',
    'https://placeimg.com/380/230/tech',
    'https://placeimg.com/380/230/people/sepia',
    'https://placeimg.com/380/230/arch/sepia',
    'https://placeimg.com/380/230/animals/grayscale'];


  constructor(private store: Store<AppState>) { 
    this.destinos=[];
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
  }

  add(d: DestinoViajeModel) {
    this.destinos.push(d);
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  getById(id: String): DestinoViajeModel {
    return this.destinos.filter(function (d) { return d.id.toString() === id; })[0];
  }

  getAll(): DestinoViajeModel[] {
    return this.destinos;
  }

  elegir(d: DestinoViajeModel) {

    this.destinos.forEach(x => x.setSelected(false));
    d.setSelected(true);
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }


}