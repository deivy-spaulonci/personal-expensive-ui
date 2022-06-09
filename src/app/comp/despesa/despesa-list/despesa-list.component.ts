import { Component, OnInit } from '@angular/core';
import { DefaultService } from "../../../service/default.service";
import { TipoDespesa } from "../../../model/tipo-despesa";
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Despesa } from 'src/app/model/despesa';
import { Util } from 'src/app/util/util';
import { Fornecedor } from 'src/app/model/fornecedor';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';


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

    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesas = tipos;
      const tipoDespesa: TipoDespesa = new TipoDespesa();
      this.tiposDespesas.splice(0, 0, tipoDespesa);
    });
    this.defaultService.get('fornecedor').subscribe(fornecedores => {
      this.fornecedores = fornecedores;
      const fornecedor: Fornecedor = new Fornecedor();
      this.fornecedores.splice(0, 0, fornecedor);
    });
    this.defaultService.get('forma-pagamento').subscribe(formas => {
      this.formasPagamento = formas;
      const formaPagamento: FormaPagamento = new FormaPagamento();
      this.formasPagamento.splice(0, 0, formaPagamento);
    });
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

  loadData(event: LazyLoadEvent) {

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id']) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['tipoDespesa'] && filtros?.['tipoDespesa'].value.id) {
        urlfiltros += '&tipoDespesa.id=' + filtros?.['tipoDespesa'].value.id;
      }
      if (filtros?.['fornecedor'] && filtros?.['fornecedor'].value.id) {
        urlfiltros += '&fornecedor.id=' + filtros?.['fornecedor'].value.id;
      }
      if (filtros?.['inicio'] && filtros?.['inicio'].value) {
        const valorDataInicial = this.util.dataBRtoDataIso(filtros?.['inicio'].value);
        urlfiltros += '&dataInicial=' + valorDataInicial;
      }
      if (filtros?.['final'] && filtros?.['final'].value) {
        const valorDataFinal = this.util.dataBRtoDataIso(filtros?.['final'].value);
        urlfiltros += '&dataFinal=' + valorDataFinal;
      }
      if (filtros?.['formaPagamento'] && filtros?.['formaPagamento'].value.id) {
        urlfiltros += '&formaPagamento.id=' + filtros?.['formaPagamento'].value.id;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');

    if (event.first!=undefined)
      this.pageNumber = (event.first + event.rows) / event.rows -1;
    this.loading = true;

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
