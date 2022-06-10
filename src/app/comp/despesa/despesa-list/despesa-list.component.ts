import { Component, OnInit } from '@angular/core';
import { DefaultService } from "../../../service/default.service";
import { TipoDespesa } from "../../../model/tipo-despesa";
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Despesa } from 'src/app/model/despesa';
import { Util } from 'src/app/util/util';
import { Fornecedor } from 'src/app/model/fornecedor';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TipoInformacaoExtra } from 'src/app/model/tipo-informacao-extra';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InformacaoExtra } from 'src/app/model/informacao-extra';


@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaListComponent implements OnInit {

  loading!: boolean;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();
  
  totalValor!: number;
  despesaSelecionada!: Despesa;
  //********************************************** CADASTRO */
  despesaCadastro!: Despesa;
  despesaForm!: FormGroup;
  informacaoExtra!: InformacaoExtra;

  tiposDespesa: TipoDespesa[] = [];
  formasPagamento: FormaPagamento[] = [];
  fornecedores: Fornecedor[] = [];
  despesas: Despesa[] = [];
  tiposInformacaoExtra: TipoInformacaoExtra[] = [];


  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) {
      this.despesaCadastro = {} as Despesa;
      this.informacaoExtra = {} as InformacaoExtra;
      this.informacaoExtra.tipoInformacaoExtra = {} as TipoInformacaoExtra;

  }

  ngOnInit(): void {
    this.loading = true;

    this.despesaForm = this.fb.group({
      comboTipoDespesa: '',
      comboFornecedor : '',
      comboFormaPagamento: '',
      inputObservacao: '',
      inputData: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required)
    });

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
    this.defaultService.get('tipo-informacao-extra').subscribe(infos =>{
      this.tiposInformacaoExtra = infos;
    })

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

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
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

  addInformacaoExtra(event: any){
    
    if (this.informacaoExtra.numero){

      if (this.despesaCadastro.informacaoExtra == null){
        this.despesaCadastro.informacaoExtra = [];
      }
      this.despesaCadastro.informacaoExtra.push(Object.assign({}, this.informacaoExtra));
      this.informacaoExtra.numero = '';

    }else{
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Número da Informação Extra Inválido!'});
    }
  }

  onSubmit(value: string) {

    debugger
    this.loading = true;
    this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data);
    ///this.despesaCadastro.data += "T00:00:00";
    this.despesaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaCadastro.valor.toString()));
    let idFornecedor:number  = this.despesaCadastro.fornecedor.id;
    this.despesaCadastro.fornecedor = {} as Fornecedor;
    this.despesaCadastro.fornecedor.id = idFornecedor;

    if(this.despesaCadastro.id){
      this.defaultService.update('despesa', this.despesaCadastro).subscribe(resultado =>{    
        this.afterSave();
      });        
    }else{
      this.defaultService.save('despesa', this.despesaCadastro).subscribe(resultado =>{    
        this.afterSave();
      });  
    }
  }

  afterSave(){
    this.loading = false;
    this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Despesa incluida com sucesso'});

    this.despesaCadastro.valor = 0;
    this.despesaCadastro.data = '';
    this.despesaCadastro.informacaoExtra = [];
    this.informacaoExtra = {} as InformacaoExtra;      
  }

  onRowEditInit(despesa: Despesa) {
    // this.clonedProducts[product.id] = {...product};
    
    this.despesaCadastro = despesa;
  }

  onRowEditSave(despesa: Despesa) {
    this.onSubmit('');
      //     delete this.clonedProducts[product.id];
      //     this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
      // }
      // else {
      //     this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
      // }
  }

  onRowEditCancel(despesa: Despesa, index: number) {
      this.despesaCadastro = {} as Despesa;
  }
}
