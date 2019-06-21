import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, APP_INITIALIZER, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgrxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, initializeDestinosViajesState, DestinosViajesEffects } from './models/destino-viajes-state.model';

//redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
}

let reducersInitialState = {
  destinos: initializeDestinosViajesState()
}
//redux fin init



@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgrxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [DestinosApiClient],
  bootstrap: [AppComponent]
})


export class AppModule { }
