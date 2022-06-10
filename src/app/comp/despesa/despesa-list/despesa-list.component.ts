import { Component, OnInit } from '@angular/core';
import { DefaultService } from "../../../service/default.service";
import { TipoDespesa } from "../../../model/tipo-despesa";
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Despesa } from 'src/app/model/despesa';
import { Util } from 'src/app/util/util';
import { Fornecedor } from 'src/app/model/fornecedor';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaListComponent implements OnInit {

  loading!: boolean;

  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  totalValor!: number;
  despesaSelecionada!: Despesa;

  tiposDespesa: TipoDespesa[] = [];
  formasPagamento: FormaPagamento[] = [];
  fornecedores: Fornecedor[] = [];
  despesas: Despesa[] = [];


  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.loading = true;

    /*
        this.items = [
      {label: 'Visualizar', icon: 'pi pi-fw pi-search',
        command: () => this.detalharDespesa = true},
      {label: 'Excluir', icon: 'pi pi-fw pi-times',
        command: () => this.excluirDespesa() },
      {label: 'Editar', icon: 'pi pi-fw pi-pencil',
        command: () => this.editarDespesa() }
    ];
    */
    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesa = tipos;
    });
    this.defaultService.get('fornecedor').subscribe(fornecedores => {
      this.fornecedores = fornecedores;
    });
    this.defaultService.get('forma-pagamento').subscribe(formas => {
      this.formasPagamento = formas;
    });
    /*
    */
    // console.log(endpoint);
    // this.defaultService.get(endpoint).subscribe(despesas => {
    //   this.despesas = despesas.content;

    //   this.defaultService.get('tipo-despesa').subscribe((tipoDespesas: TipoDespesa[]) => {
    //     this.tiposDespesa = tipoDespesas;
    //   });

    // });

  }

  /*
    excluirDespesa(){
      this.confirmationService.confirm({
        message: 'Deseja realmente excluir essa despesa?',
        header: 'Confirmar Exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.defaultService
            .delete(this.despesaSelecionada, 'despesa')
            .subscribe(resultado =>{
              this.despesas = this.despesas.filter(val => val.id !== this.despesaSelecionada.id);
              this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
          });
        }
      });
  }

  editarDespesa(){
    this.router.navigate(['/despesa-form', {id: this.despesaSelecionada.id}]);
  }
  */

  filterColumnData(table: Table, periodoDatas: any){
    console.log(periodoDatas.value);
    // if(periodoDatas.value[0])
    // let valorInteiro:string = valor.replace(/\D/g, '');
    // if(valorInteiro.trim().length>0)
    //   table.filter(valor.replace(/\D/g, ''), 'id', 'equals');
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id'] && filtros?.['id'].value!=null) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['tipoDespesa'] && filtros?.['tipoDespesa'].value) {
        urlfiltros += '&tipoDespesa=' + filtros?.['tipoDespesa'].value;
      }
      if (filtros?.['fornecedor.id'] && filtros?.['fornecedor.id'].value) {
        urlfiltros += '&fornecedor.id=' + filtros?.['fornecedor.id'].value;
      }
      if(filtros?.['periodo']){
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

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('despesa/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
    });
  }

}
