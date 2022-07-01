import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Cidade } from 'src/app/model/cidade';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-fornecedor-grid',
  templateUrl: './fornecedor-grid.component.html',
  styleUrls: ['./fornecedor-grid.component.css']
})
export class FornecedorGridComponent implements OnInit {

  @Input() loading: boolean = false;
  
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();
  
  fornecedorSelected!: Fornecedor;
  
  @Output() indexTabChange: EventEmitter<Fornecedor> = new EventEmitter<Fornecedor>();
  
  fornecedores: Fornecedor[] = [];
  cidades: Cidade[]=[];
  
  constructor(private defaultService: DefaultService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onEditSave(fornecedor: Fornecedor) {
    this.indexTabChange.emit(fornecedor);
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let apiFilters: string = '';

    if (event.filters) {
      let filters = event.filters;
      if (filters?.['id'] && filters?.['id'].value!=null) {
        apiFilters += '&id=' + filters?.['id'].value;
      }
      if (filters?.['nome'] && filters?.['nome'].value) {
        apiFilters += '&nome=' + filters?.['nome'].value;
      }
      if (filters?.['cnpj'] && filters?.['cnpj'].value) {
        apiFilters += '&cnpj=' + filters?.['cnpj'].value;
      }
      if (filters?.['cidade.nome'] && filters?.['cidade.nome'].value) {
        apiFilters += '&cidade.nome=' + filters?.['cidade.nome'].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + apiFilters;

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      
    });
  }

}
