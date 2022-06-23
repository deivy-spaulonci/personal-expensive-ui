import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'column-filter-tipo',
  templateUrl: './column-filter-tipo.component.html',
  styleUrls: ['./column-filter-tipo.component.css']
})
export class ColumnFilterTipoComponent implements OnInit {

  @Input() tipoColumn: string = '';
  @Input() arrValues: any[]=[];
  @Input() optLabel: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ajusteFilter(event:any):any{
    if(event.value && event.value.value){
      return event.value.value;
    }else if(event.value && event.value.id){
      return event.value.id;
    }else if(event.value){
      return event.value;
    }
    return null;
  }

}
