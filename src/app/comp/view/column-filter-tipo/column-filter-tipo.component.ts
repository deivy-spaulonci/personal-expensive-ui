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

}
