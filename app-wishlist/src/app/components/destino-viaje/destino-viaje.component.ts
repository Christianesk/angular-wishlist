import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { VoteUpAction, VoteDownAction, EliminarDestinoAction } from '../../models/destino-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViajeModel;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4 pb-4';
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ngOnInit() {
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

  eliminarDestino(){
    this.store.dispatch(new EliminarDestinoAction(this.destino));
    return false;
  }

}
