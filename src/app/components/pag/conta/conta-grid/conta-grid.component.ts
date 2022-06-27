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

  totalValor!: number;
  contaSelecionada!: Conta;

  @Input() tiposContaFilter: TipoConta[] = [];
  @Input() formasPagamentoFilter: FormaPagamento[] = [];

  @Output() indexTabChange: EventEmitter<Conta> = new EventEmitter<Conta>();

  contas: Conta[]=[];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  excluirConta(conta: any) {
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
    
    // this.despesaCadastro = Object.assign({}, despesa);
    // this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data)
    // if(this.despesaCadastro.valor.toString().length==2){
    //   this.despesaCadastro.valor = this.util.formatFloatToReal(this.despesaCadastro.valor.toString()+'00');
    // }
  }

  // onEditSave(conta: any) {
  //   this.tabSelected = 1;
  //   this.contaCadastro = Object.assign({}, conta);
  //   conta = this.transformConta(conta);
  //   if(conta.valor.toString().length==2){
  //     conta.valor = this.util.formatFloatToReal(conta.valor.toString()+'00');
  //   }
  // }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value!=null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }

      if (filtros?.['tipoConta'] && filtros?.['tipoConta'].value) {
        urlfiltros += '&tipoConta.id=' + filtros?.['tipoConta'].value;
      }
      if(filtros?.['periodoVencimento']){
        if (filtros?.['periodoVencimento'].value && filtros?.['periodoVencimento'].value[0]) {
          urlfiltros += '&vencimentoInicial=' + filtros?.['periodoVencimento'].value[0].toISOString().split('T')[0];
        }
        if (filtros?.['periodoVencimento'].value && filtros?.['periodoVencimento'].value[1]) {
          urlfiltros += '&vencimentoFinal=' + filtros?.['periodoVencimento'].value[1].toISOString().split('T')[0];
        }
      }
      if(filtros?.['periodoEmissao']){
        if (filtros?.['periodoEmissao'].value && filtros?.['periodoEmissao'].value[0]) {
          urlfiltros += '&emissaoInicial=' + filtros?.['periodoEmissao'].value[0].toISOString().split('T')[0];
        }
        if (filtros?.['periodoEmissao'].value && filtros?.['periodoEmissao'].value[1]) {
          urlfiltros += '&emissaoFinal=' + filtros?.['periodoEmissao'].value[1].toISOString().split('T')[0];
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
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('conta/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
    });
  }

  getBackgroundColorStatus(status:number):string{
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
