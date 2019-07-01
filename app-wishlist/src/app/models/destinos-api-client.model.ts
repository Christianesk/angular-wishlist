import { Injectable} from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destino-viajes-state.model';

@Injectable()
export class DestinosApiClient {

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
  }

  add(d: DestinoViajeModel) {
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegir(d: DestinoViajeModel) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  getById(id: String): DestinoViajeModel {
    return null;
  }


}