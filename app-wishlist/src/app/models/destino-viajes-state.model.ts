import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViajeModel } from './destino-viaje.model';
import { DestinosApiClient } from './destinos-api-client.model';
import { HttpClientModule,HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

// ESTADO
export interface DestinosViajesState {
  items: DestinoViajeModel[];
  loading: boolean;
  favorito: DestinoViajeModel;
}

export function initializeDestinosViajesState() {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}

// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  ELIMINAR_DESTINO = '[Destinos Viajes] Borrado',
  INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViajeModel) { }
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViajeModel) { }
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViajeModel) { }
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViajeModel) { }
}

export class EliminarDestinoAction implements Action {
  type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
  constructor(public destino: DestinoViajeModel) {}
}

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;
  constructor(public destinos: string[]) { }
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction
  | VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS
export function reducerDestinosViajes(
  state: DestinosViajesState,
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.INIT_MY_DATA: {
      const destinos: string[] = (action as InitMyDataAction).destinos;
      return {
          ...state,
          items: destinos.map((d) => new DestinoViajeModel(d, '',''))
        };
    }
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach(x => x.setSelected(false));
      const fav: DestinoViajeModel = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
    case DestinosViajesActionTypes.VOTE_UP: {
      const d: DestinoViajeModel = (action as VoteUpAction).destino;
      d.voteUp();
      return { ...state };
    }
    case DestinosViajesActionTypes.VOTE_DOWN: {
      const d: DestinoViajeModel = (action as VoteDownAction).destino;
      d.voteDown();
      return { ...state };
    }
    case DestinosViajesActionTypes.ELIMINAR_DESTINO: {
      return {
        ...state,
        items: [...state.items.filter(d => d.id != (action as EliminarDestinoAction).destino.id)]
      };
    }
  }
  return state;
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(private actions$: Actions) { }
}