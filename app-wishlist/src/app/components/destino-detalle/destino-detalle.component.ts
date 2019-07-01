import { Component, OnInit} from '@angular/core';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from '../../models/destinos-api-client.model';


@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient ]
})
export class DestinoDetalleComponent implements OnInit {

  destino: DestinoViajeModel;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
