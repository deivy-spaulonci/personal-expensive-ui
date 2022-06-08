import { Component, OnInit } from '@angular/core';
import {DefaultService} from "../../../service/default.service";
import {TipoDespesa} from "../../../model/tipo-despesa";
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Despesa } from 'src/app/model/despesa';

@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css']
})
export class DespesaListComponent implements OnInit {

  pageNumber=10;

  tiposDespesa:TipoDespesa[]=[];
  formasPagamento:FormaPagamento[]=[];
  despesas:Despesa[]=[];

  constructor(private defaultService: DefaultService) { }

  ngOnInit(): void {
    let endpoint = 'despesa/page?sort=data,desc'+'&size='+this.pageNumber;
    console.log(endpoint);
    this.defaultService.get(endpoint).subscribe(despesas =>{
      this.despesas = despesas.content;

      this.defaultService.get('tipo-despesa').subscribe((tipoDespesas: TipoDespesa[]) => {
        this.tiposDespesa = tipoDespesas;
      });
  
    })
  }

}
