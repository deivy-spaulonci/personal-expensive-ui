import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.css']
})
export class InputMoneyComponent{

  @Input() modelNg  : Number = 0;
  @Input() formGrp!: FormGroup;
  @Input() formCtr!: FormControl;
  @Input() width: string = '100px';
  
  @Output() inputValueChange: EventEmitter<Number> = new EventEmitter<Number>();  

  constructor(private fb: FormBuilder) {
    this.formGrp = this.fb.group({
      formCtr: this.formCtr
    });
  }

  formatEvent($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    var v = element.value.replace(/\D/g, '');
    v = (Number(v) / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    element.value =  v.toString();
    
    // const money =  new Intl.NumberFormat('pt-BR',   { style:'currency', currency: 'R$ ' });
    // element.value = money.format(Number(v)).toString();
    //this.modelNg = Number(element.value.replace('.', '').replace(',', '.'));;
    //this.modelNg = new Number(v.toString());
  }

}
