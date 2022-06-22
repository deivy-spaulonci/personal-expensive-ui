import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-money',
  template: './input-money.component.html',
  styleUrls: ['./input-money.component.css']
})
export class InputMoneyComponent{

  @Input() formControlName!: FormControl;
  @Input() controlName!: string;
  @Input() modelNg  : string = '0';
  //@Output() navigate = new EventEmitter();

  constructor() { }

  onKeyUp($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    var v = element.value.replace(/\D/g, '');
    v = (Number(v) / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    element.value =  v.toString();
  }

}
