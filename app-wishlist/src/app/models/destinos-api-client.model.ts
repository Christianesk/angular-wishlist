import { Injectable, Inject, forwardRef } from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destino-viajes-state.model';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViajeModel[] = [];

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


  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
  ) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  add(d: DestinoViajeModel) {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
        const myDb = db;
        myDb.destinos.add(d);
        console.log('todos los destinos de la db!');
        myDb.destinos.toArray().then(destinos => console.log(destinos))
      }
    });
  }

  elegir(d: DestinoViajeModel) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  getById(id: String): DestinoViajeModel {
    return this.destinos.filter(function (d) { return d.id.toString() === id; })[0];
  }

  getAll(): DestinoViajeModel[] {
    return this.destinos;
  }


}