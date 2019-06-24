import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViajeModel>;
  fg: FormGroup;
  miLongitud = 3;
  searchResults: string[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.miLongitud)
      ])],
      url: ['', Validators.compose([
        Validators.required,
        this.urlValidator,
        this.urlValidatorParametrizable(this.miLongitud)
      ])],
      descripcion: ['']
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ', form);
    });
  }

  ngOnInit() {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/datos.json'))
      ).subscribe(ajaxResponse => {
        this.searchResults = ajaxResponse.response;
      });
  }

  guardar(nombre: string, url: string, descripcion: string): boolean {
    const d = new DestinoViajeModel(nombre, url, descripcion);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;

    if (l > 0 && l < 5) {
      return { invalidNombre: true };
    }

    return null;
  }

  urlValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;

    if (l > 0 && l < 5) {
      return { invalidUrl: true };
    }

    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {

      const l = control.value.toString().trim().length;

      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }

      return null;
    }
  }

  urlValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {

      const l = control.value.toString().trim().length;

      if (l > 0 && l < minLong) {
        return { minLongUrl: true };
      }

      return null;
    }
  }



}
