import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'combo-tipo',
  templateUrl: './combo-tipo.component.html',
  styleUrls: ['./combo-tipo.component.css']
})
export class ComboTipoComponent implements OnInit {

  @Input() modelNg: any = {};
  @Input() id: any = {};
  @Input() optLabel: string = '';
  @Input() formGrp!: FormGroup;
  @Input() formCtr: FormControl = new FormControl('');
  @Input() arrValues: any[]=[];
  @Input() api:string = '';
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>(); 

  valores: []=[];

  constructor(private fb: FormBuilder,
    private defaultService: DefaultService) {
    this.formGrp = this.fb.group({
      formCtr: this.formCtr
    });
   }

  ngOnInit(): void {
    if(this.api && this.api.trim.length>1){
      this.defaultService.get(this.api).subscribe(itens =>{
        this.arrValues = itens;
      });
    }
  }

}
