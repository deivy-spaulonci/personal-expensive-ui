import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Conta } from 'src/app/model/conta';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-conta-grid',
  templateUrl: './conta-grid.component.html',
  styleUrls: ['./conta-grid.component.css']
})
export class ContaGridComponent implements OnInit {

  @Input() loading: boolean = false;

  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  valorTotal!: number;
  contaSelected!: Conta;

  @Input() tiposContaFilter: TipoConta[] = [];
  @Input() formasPagamentoFilter: FormaPagamento[] = [];

  @Output() indexTabChange: EventEmitter<Conta> = new EventEmitter<Conta>();

  contas: Conta[]=[];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  confirmDeleteConta(conta: any) {
    this.confirmationService.confirm({
      accept: () => {
        this.defaultService
          .delete('conta', conta.id)
          .subscribe(resultado => {
            this.contas = this.contas.filter(val => val.id !== conta.id);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta excluída' });
          });
      }
    });
  }

  onEditSave(conta: Conta) {
    this.indexTabChange.emit(conta);
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let apiFilters: string = '';

    if (event.filters) {
      let filters = event.filters;
      if (filters?.['id'] && filters?.['id'].value!=null) {
        apiFilters += '&id=' + filters?.['id'].value;
      }

      if (filters?.['tipoConta'] && filters?.['tipoConta'].value) {
        apiFilters += '&tipoConta.id=' + filters?.['tipoConta'].value;
      }
      if(filters?.['periodoVencimento']){
        if (filters?.['periodoVencimento'].value && filters?.['periodoVencimento'].value[0]) {
          apiFilters += '&vencimentoInicial=' + filters?.['periodoVencimento'].value[0].toISOString().split('T')[0];
        }
        if (filters?.['periodoVencimento'].value && filters?.['periodoVencimento'].value[1]) {
          apiFilters += '&vencimentoFinal=' + filters?.['periodoVencimento'].value[1].toISOString().split('T')[0];
        }
      }
      if(filters?.['periodoEmissao']){
        if (filters?.['periodoEmissao'].value && filters?.['periodoEmissao'].value[0]) {
          apiFilters += '&emissaoInicial=' + filters?.['periodoEmissao'].value[0].toISOString().split('T')[0];
        }
        if (filters?.['periodoEmissao'].value && filters?.['periodoEmissao'].value[1]) {
          apiFilters += '&emissaoFinal=' + filters?.['periodoEmissao'].value[1].toISOString().split('T')[0];
        }
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'vencimento');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'conta/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + apiFilters;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('conta/valorTotal?' + apiFilters).subscribe(somatotal => {
        this.valorTotal = somatotal;
      });
    });
  }

  getBackgroundColorContaStatus(status:number):string{
    switch(status){
      case -1: return '#FFCDD2';//atrasado
      case 0: return '#FFECB3';//vencimento hj
      case 1: return '#B3E5FC';//aberto
      case 2: return '#C8E6C9';//pago
      case 3: return '#FFCDD2';//cancelado
      default: return '#B3E5FC';
    }
  }
}
