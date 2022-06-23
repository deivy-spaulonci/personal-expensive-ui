import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'column-bt-action',
  templateUrl: './column-bt-action.component.html',
  styleUrls: ['./column-bt-action.component.css']
})
export class ColumnBtActionComponent implements OnInit {

  @Input() icon: string = 'trash';
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  classIcon = '';

  constructor() { }

  ngOnInit(): void {
    if(this.icon=='trash'){
      this.classIcon = 'p-button-danger'
    }else if(this.icon=='pencil'){
      this.classIcon = 'p-button-success'
    }
  }

  excuteAction(){
    this.action.emit(null);
  }

}
