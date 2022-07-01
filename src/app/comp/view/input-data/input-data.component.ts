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
  @Input() width: string = '100px';
  @Input() placeHolder!: string;
  @Input() formField: boolean = true;
  @Input() id!: string;
  
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputBlur: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private fb: FormBuilder) {
    this.formGrp = this.fb.group({
      formCtr: this.formCtr
    });
   }

  ngOnInit(): void {
  }

  setInputBlur(){
    this.inputBlur.emit(null);
  }


}
