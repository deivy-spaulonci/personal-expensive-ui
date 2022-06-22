import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  @Input() modelNg  : string = '';
  @Input() formGrp!: FormGroup;
  @Input() formCtr!: FormControl;
  
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();  
  
  constructor(private fb: FormBuilder) {
    this.formGrp = this.fb.group({
      formCtr: this.formCtr
    });
   }

  ngOnInit(): void {
  }

}