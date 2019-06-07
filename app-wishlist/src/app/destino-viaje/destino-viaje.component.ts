import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import {DestinoViajeModel} from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViajeModel;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass= 'col-md-4 pb-4';
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit() {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

}
