import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Fornecedor } from 'src/app/model/fornecedor';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorComponent implements OnInit {

  loading!: boolean;
  tabSelected:number = 0;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  fornecedorSelecionado!: Fornecedor;
  //********************************************** CADASTRO */
  fornecedorCadastro!: any;
  fornecedorForm!:FormGroup;

  fornecedores: Fornecedor[] = [];

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) {
      this.fornecedorCadastro = {} as Fornecedor;
      
    }

  ngOnInit(): void {
    this.loading = true;


  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    // if (event.filters) {
    //   let filtros = event.filters;
    //   if (filtros?.['id'] && filtros?.['id'].value!=null) {
    //     urlfiltros += '&id=' + filtros?.['id'].value;
    //   }
    //   if (filtros?.['tipoDespesa'] && filtros?.['tipoDespesa'].value) {
    //     urlfiltros += '&tipoDespesa=' + filtros?.['tipoDespesa'].value;
    //   }
    //   if (filtros?.['fornecedor.id'] && filtros?.['fornecedor.id'].value) {
    //     urlfiltros += '&fornecedor.id=' + filtros?.['fornecedor.id'].value;
    //   }
    //   if(filtros?.['periodo']){
    //     if (filtros?.['periodo'].value && filtros?.['periodo'].value[0]) {
    //       urlfiltros += '&dataInicial=' + filtros?.['periodo'].value[0].toISOString().split('T')[0];
    //     }
    //     if (filtros?.['periodo'].value && filtros?.['periodo'].value[1]) {
    //       urlfiltros += '&dataFinal=' + filtros?.['periodo'].value[1].toISOString().split('T')[0];
    //     }
    //   }
    //   if (filtros?.['formaPagamento'] && filtros?.['formaPagamento'].value) {
    //     urlfiltros += '&formaPagamento=' + filtros?.['formaPagamento'].value;
    //   }
    // }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'asc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      
    });
  }
}
