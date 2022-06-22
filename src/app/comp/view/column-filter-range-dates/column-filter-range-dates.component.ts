import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'column-filter-range-dates',
  templateUrl: './column-filter-range-dates.component.html',
  styleUrls: ['./column-filter-range-dates.component.css']
})
export class ColumnFilterRangeDatesComponent implements OnInit {

  @Input() fieldColumn: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
