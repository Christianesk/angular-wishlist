import { Injectable, Inject, forwardRef } from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViajeModel[];
  current: Subject<DestinoViajeModel> = new BehaviorSubject<DestinoViajeModel>(null);

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


  constructor() { 
    this.destinos=[];
  }

  add(d: DestinoViajeModel) {
    this.destinos.push(d);
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
    this.current.next(d);
  }

  suscribeOnChange(fn) {
    this.current.subscribe(fn);
  }

}