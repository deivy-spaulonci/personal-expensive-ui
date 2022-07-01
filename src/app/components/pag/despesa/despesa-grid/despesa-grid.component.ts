import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  totalValor!: number;
  despesaSelected!: Despesa;

  @Input() tiposDespesaFilter: TipoDespesa[] = [];
  @Input() formasPagamentoFilter: FormaPagamento[] = [];
  @Input() fornecedoresFilter: Fornecedor[] = [];

  @Output() indexTabChange: EventEmitter<Despesa> = new EventEmitter<Despesa>();

  despesas: Despesa[] = [];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
  }

  confirmDeleteDespesa(despesa: any) {
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

  onEditSave(despesa: Despesa) {
    this.indexTabChange.emit(despesa);
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let apiFilters: string = '';

    if (event.filters) {
      let filters = event.filters;
      if (filters?.['id'] && filters?.['id'].value != null) {
        apiFilters += '&id=' + filters?.['id'].value;
      }
      if (filters?.['tipoDespesa'] && filters?.['tipoDespesa'].value) {
        apiFilters += '&tipoDespesa=' + filters?.['tipoDespesa'].value;
      }
      if (filters?.['fornecedor.id'] && filters?.['fornecedor.id'].value) {
        apiFilters += '&fornecedor.id=' + filters?.['fornecedor.id'].value;
      }
      if (filters?.['periodo']) {
        if (filters?.['periodo'].value && filters?.['periodo'].value[0]) {
          apiFilters += '&dataInicial=' + filters?.['periodo'].value[0].toISOString().split('T')[0];
        }
        if (filters?.['periodo'].value && filters?.['periodo'].value[1]) {
          apiFilters += '&dataFinal=' + filters?.['periodo'].value[1].toISOString().split('T')[0];
        }
      }
      if (filters?.['formaPagamento'] && filters?.['formaPagamento'].value) {
        apiFilters += '&formaPagamento=' + filters?.['formaPagamento'].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');

    if (event.first != undefined)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + apiFilters;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.defaultService.get('despesa/valorTotal?' + apiFilters).subscribe(somatotal => {
        this.totalValor = somatotal;
        this.loading = false;
      });
    });
  }

}
