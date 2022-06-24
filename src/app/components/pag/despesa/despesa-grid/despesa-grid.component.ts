import { Component, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Despesa } from 'src/app/model/despesa';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { TipoDespesa } from 'src/app/model/tipo-despesa';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-despesa-grid',
  templateUrl: './despesa-grid.component.html',
  styleUrls: ['./despesa-grid.component.css']
})
export class DespesaGridComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() tabSelected: number = 0;

  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  totalValor!: number;
  despesaSelecionada!: Despesa;

  @Input() tiposDespesaFilter: TipoDespesa[] = [];
  @Input() formasPagamentoFilter: FormaPagamento[] = [];
  @Input() fornecedoresFilter: Fornecedor[] = [];

  despesas: Despesa[] = [];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
  }

  excluirDespesa(despesa: any) {
    this.confirmationService.confirm({
      accept: () => {
        this.defaultService
          .delete('despesa', despesa.id)
          .subscribe(resultado => {
            this.despesas = this.despesas.filter(val => val.id !== despesa.id);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Despesa excluída' });
          });
      }
    });
  }

  onEditSave(despesa: any) {
    this.tabSelected = 1;
    
    // this.despesaCadastro = Object.assign({}, despesa);
    // this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data)
    // if(this.despesaCadastro.valor.toString().length==2){
    //   this.despesaCadastro.valor = this.util.formatFloatToReal(this.despesaCadastro.valor.toString()+'00');
    // }
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value != null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['tipoDespesa'] && filtros?.['tipoDespesa'].value) {
        urlfiltros += '&tipoDespesa=' + filtros?.['tipoDespesa'].value;
      }
      if (filtros?.['fornecedor.id'] && filtros?.['fornecedor.id'].value) {
        urlfiltros += '&fornecedor.id=' + filtros?.['fornecedor.id'].value;
      }
      if (filtros?.['periodo']) {
        if (filtros?.['periodo'].value && filtros?.['periodo'].value[0]) {
          urlfiltros += '&dataInicial=' + filtros?.['periodo'].value[0].toISOString().split('T')[0];
        }
        if (filtros?.['periodo'].value && filtros?.['periodo'].value[1]) {
          urlfiltros += '&dataFinal=' + filtros?.['periodo'].value[1].toISOString().split('T')[0];
        }
      }
      if (filtros?.['formaPagamento'] && filtros?.['formaPagamento'].value) {
        urlfiltros += '&formaPagamento=' + filtros?.['formaPagamento'].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');

    if (event.first != undefined)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.defaultService.get('despesa/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
        this.loading = false;
      });
    });
  }

}
