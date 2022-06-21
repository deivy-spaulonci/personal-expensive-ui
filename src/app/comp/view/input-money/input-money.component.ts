import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.css']
})
export class InputMoneyComponent{

  @Output() value: string = '';
  //@Output() navigate = new EventEmitter();

  constructor() { }

  onKeyUp(event:any) {
    console.log(JSON.stringify(event));
    console.log(this.value);
  }

}
