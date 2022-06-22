import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Conta } from 'src/app/model/conta';
import { FormaPagamento } from 'src/app/model/forma-pagamento';
import { Fornecedor } from 'src/app/model/fornecedor';
import { LancamentoContaCartao } from 'src/app/model/lancamento-conta-cartao';
import { TipoConta } from 'src/app/model/tipo-conta';
import { DefaultService } from 'src/app/service/default.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaComponent implements OnInit {

  loading!: boolean;
  tabSelected:number = 0;
  //********************************************** TABELA */
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;
  util: Util = new Util();

  totalValor!: number;
  contaSelecionada!: Conta;
  //********************************************** CADASTRO */
  contaCadastro!:any
  lancamentoContaCartaoCadastro!:any
  contaForm!:FormGroup;

  contas: Conta[]=[];
  tiposConta: TipoConta[]=[];
  formasPagamento: FormaPagamento[]=[];
  lancamentosContaCartao: LancamentoContaCartao[]=[];
  fornecedores: Fornecedor[]=[];

  formGroupInput!: FormControl;

  inputValor = new FormControl('');
  comboTipoConta = new FormControl('');
  comboFormaPagamento = new FormControl('');
  inputEmissao = new FormControl('');
  inputVencimento = new FormControl('');
  inputDataPagamento = new FormControl('');

  constructor(private defaultService: DefaultService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder) {
      this.contaCadastro ={} as Conta;
      this.contaCadastro.tipoCona = {} as TipoConta;
      this.lancamentoContaCartaoCadastro = {} as LancamentoContaCartao;
  }

  ngAfterContentChecked() {
      this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.loading = true;

    this.contaForm = this.fb.group({
      inputNumero: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required),
      inputCodigoBarra: '',
      //comboTipoConta: new FormControl('', Validators.required),
      //inputEmissao: new FormControl('', Validators.required),
      //inputVencimento: new FormControl('', Validators.required),
      inputParcela: '',
      inputTotalParcela: '',
      formGroupInput: new FormControl('', Validators.required),
      inputObservacao: '',
      //inputDataPagamento: '',
      //comboFormaPagamento: '',
      inputValorPago: ''
    });
    
    this.defaultService.get('fornecedor').subscribe(fornecedores =>{
      this.fornecedores = fornecedores;
      this.loading = false;
    });


  }

  changeTab(event: any){
    // if(event.index==0){
    //   this.newDespesaCadastro();
    // }
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
 
      if (filtros?.['tipoConta'] && filtros?.['tipoConta'].value) {
        urlfiltros += '&tipoConta.id=' + filtros?.['tipoConta'].value.id;
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

  onSubmit(table:Table) {
    this.loading = true;
   
    this.contaCadastro = this.transformConta(this.contaCadastro);

    this.defaultService.save('conta', this.contaCadastro).subscribe(resultado =>{    
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
        if(this.contaCadastro.id){
          this.tabSelected = 0;
          table.filter(null, '', '');
        }
    });  
  }

  excluirConta(conta:any){
    this.confirmationService.confirm({
      accept: () => {
        this.defaultService
          .delete('despesa', conta.id)
          .subscribe(resultado =>{
            this.contas = this.contas.filter(val => val.id !== conta.id);
            this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Conta excluída'});
        });
      }
    });
  }

  transformConta(conta:Conta):Conta{
    conta.vencimento = this.util.transformDates(conta.vencimento);
    conta.emissao = this.util.transformDates(conta.emissao);
    conta.valor = this.util.formatMoedaToFloat(conta.valor.toString());
    
    if(conta.dataPagamento && conta.valorPago){
      conta.valorPago = this.util.formatMoedaToFloat(conta.valorPago.toString());
    }
    return conta;
  }

  onEditSave(conta: any) {
    this.tabSelected = 1;
    this.contaCadastro = Object.assign({}, conta);
    conta = this.transformConta(conta);
    if(conta.valor.toString().length==2){
      conta.valor = this.util.formatFloatToReal(conta.valor.toString()+'00');
    }
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
