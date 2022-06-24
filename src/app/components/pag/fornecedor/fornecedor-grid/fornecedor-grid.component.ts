import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

  fornecedores: Fornecedor[] = [];
  cidades: Cidade[]=[];

  fornecedorSelecionado!: Fornecedor;

  //@Output() indexTabChange: EventEmitter<Despesa> = new EventEmitter<Despesa>();
  
  constructor(private defaultService: DefaultService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value!=null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['nome'] && filtros?.['nome'].value) {
        urlfiltros += '&nome=' + filtros?.['nome'].value;
      }
      if (filtros?.['cnpj'] && filtros?.['cnpj'].value) {
        urlfiltros += '&cnpj=' + filtros?.['cnpj'].value;
      }
      if (filtros?.['cidade.nome'] && filtros?.['cidade.nome'].value) {
        urlfiltros += '&cidade.nome=' + filtros?.['cidade.nome'].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      
    });
  }

}
