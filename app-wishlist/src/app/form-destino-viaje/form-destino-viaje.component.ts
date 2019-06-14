import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajeModel>;
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['',Validators.required],
      url: [''],
      descripcion: ['']
    });

    this.fg.valueChanges.subscribe((form:any)=>{
      console.log('cambio el formulario: ',form);
    });
  }

  ngOnInit() {
  }

  guardar(nombre: string,url:string,descripcion:string): boolean{
    const d = new DestinoViajeModel(nombre,url,descripcion);
    this.onItemAdded.emit(d);
    return false;
  }
}
