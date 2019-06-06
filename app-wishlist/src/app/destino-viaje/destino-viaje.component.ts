import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {DestinoViajeModel} from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViajeModel;
  @HostBinding('attr.class') cssClass= 'col-md-4 pb-4';

  constructor() {   }

  ngOnInit() {
  }

}
