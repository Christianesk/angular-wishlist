import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';

class DestinosApiClientViejo {
  getById(id: String): DestinoViajeModel {
    console.log('llamado por la clave vieja');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: String;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONIG = new InjectionToken<AppConfig>('app.config');

class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  getById(id: String): DestinoViajeModel {
    console.log('llamando por la clase decorada');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    { provide: APP_CONIG, useValue: APP_CONFIG_VALUE },
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated },
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient }
  ]
})
export class DestinoDetalleComponent implements OnInit {

  destino: DestinoViajeModel;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
