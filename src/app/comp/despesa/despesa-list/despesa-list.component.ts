import { Component, OnInit, ɵpublishDefaultGlobalUtils } from '@angular/core';
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
  tabSelected:number = 0;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();
  
  totalValor!: number;
  despesaSelecionada!: Despesa;
  //********************************************** CADASTRO */
  despesaCadastro!: any;
  despesaForm!: FormGroup;
  informacaoExtra!: InformacaoExtra;  
  dayOfWeekend:string = '';

  tiposDespesa: TipoDespesa[] = [];
  formasPagamento: FormaPagamento[] = [];
  fornecedores: Fornecedor[] = [];
  despesas: Despesa[] = [];
  tiposInformacaoExtra: TipoInformacaoExtra[] = [];

  data: any;


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


    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    }
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

  excluirDespesa(despesa:any){
    this.confirmationService.confirm({
      accept: () => {
        this.defaultService
          .delete('despesa', despesa.id)
          .subscribe(resultado =>{
            this.despesas = this.despesas.filter(val => val.id !== despesa.id);
            this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
        });
      }
    });
  }

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

  onSubmit(value: string, table:Table) {
    this.loading = true;
    this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data);
    this.despesaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaCadastro.valor.toString()));
   
    this.defaultService.save('despesa', this.despesaCadastro).subscribe(resultado =>{    
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
        if(this.despesaCadastro.id){
          this.tabSelected = 0;
          table.filter(null, '', '');
        }
        this.newDespesaCadastro();
        this.dayOfWeekend = '';
    });  
  }

  newDespesaCadastro(){
    this.despesaCadastro.valor = 0;
    this.despesaCadastro.data = '';
    this.despesaCadastro.informacaoExtra = [];
    this.informacaoExtra = {} as InformacaoExtra;         
    this.dayOfWeekend = ''; 
  }

  changeTab(event: any){
    this.tabSelected = event.index;
    if(event.index==0){
      this.newDespesaCadastro();
    }
  }

  onEditSave(despesa: any) {
    this.tabSelected = 1;
    this.despesaCadastro = Object.assign({}, despesa);
    this.despesaCadastro.data = this.util.transformDates(this.despesaCadastro.data)
    if(this.despesaCadastro.valor.toString().length==2){
      this.despesaCadastro.valor = this.util.formatFloatToReal(this.despesaCadastro.valor.toString()+'00');
    }
  }

  showDayOfWeekend(){
    let data:Date = new Date(this.util.transformDates(this.despesaCadastro.data));
    data.setDate(data.getDate() + 1);
    switch(data.getDay()){
      case 0: this.dayOfWeekend = 'Domingo'; break;
      case 1: this.dayOfWeekend = 'Segunda-Feira'; break;
      case 2: this.dayOfWeekend = 'Terça-Feira'; break;
      case 3: this.dayOfWeekend = 'Quarta-Feira'; break;
      case 4: this.dayOfWeekend = 'Quinta-Feira'; break;
      case 5: this.dayOfWeekend = 'Sexta-Feira'; break;
      case 6: this.dayOfWeekend = 'Sabado'; break;
    }
  }

  consultaAjudaCusto(){
    let data:Date = new Date(this.util.transformDates(this.despesaCadastro.data));
    data.setDate(data.getDate() + 1);
    if(data.getDay() > 0 && data.getDay() < 4){
      let valorTipoDespesa = this.despesaCadastro.tipoDespesa.value;
      let valorFormaPagamento = this.despesaCadastro.formaPagamento.value;
      if(valorTipoDespesa =="ALIMENTACAO"
      || valorTipoDespesa =="COMBUSTIVEL"
      || valorTipoDespesa =="HARDWARE_PC"
      || valorTipoDespesa =="ESTACIONAMENTO"
      || valorTipoDespesa =="PEDAGIO"
      || valorTipoDespesa =="SUPERMERCADO"){
        if(valorFormaPagamento=="DINHEIRO"
        || valorFormaPagamento=="CARTAO_DEBITO_SANTANDER"){
          this.messageService.add({severity: 'info', summary: 'Aviso', detail: 'Possível despesa para ajuda de custo'});
        }
      }
    }
    // switch (data.getDay){
    //   case
    // }
  }
}
